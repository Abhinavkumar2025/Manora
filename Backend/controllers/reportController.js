import Report from "../models/report.js";
import { reportSchema } from "../validators/reportValidator.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const createReport = async(req,res) => {
    try{
        const {error, value} = reportSchema.validate(req.body, {abortEarly: false});
        
        if(error){
            return res.status(400).json({
                message: "Validation Failed",
                errors: error.details.map((err)=>({
                    field: err.path[0],
                    message: err.message
                }))
            })
        }

        if(!req.file){
            return res.status(400).json({
                errors : [
                    {
                        field: "image",
                        message: "Image is required"
                    },
                ],
            });
        }

        const { reportType, itemName, location, description } = value;

        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "lost_and_found" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });

        const newReport = await Report.create({
            reportType,
            itemName,
            location,
            description,
            imageUrl: uploadResult.secure_url,
        });

        res.status(201).json({
            message: "Report submitted successfully",
            report: newReport,
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

export const getReports = async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });

        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch reports",
            error: err.message,
        });
    }
};