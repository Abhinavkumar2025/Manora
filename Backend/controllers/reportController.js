import Report from "../models/report.js";
import { reportSchema } from "../validators/reportValidator.js";

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

        const { reportType, itemName, location, description } = value;

        const newReport = await Report.create({
            reportType,
            itemName,
            location,
            description
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