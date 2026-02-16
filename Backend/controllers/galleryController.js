
import Gallery from "../models/gallery.js";
import cloudinary from "../config/cloudinary.js";

// @desc    Upload a new photo
// @route   POST /manora/gallery
// @access  Private
export const uploadPhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "manora_gallery" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(req.file.buffer);
        });

        const gallery = await Gallery.create({
            user: req.user._id,
            album: req.body.albumId,
            image_url: result.secure_url,
            cloudinary_id: result.public_id,
            caption: req.body.caption,
        });

        // Update album cover image if empty
        // logic could be added here, but for simplicity let's keep it separate

        res.status(201).json(gallery);
    } catch (error) {
        console.error("Error uploading photo:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get user's photos
// @route   GET /manora/gallery/mine
// @access  Private
export const getMyPhotos = async (req, res) => {
    try {
        const photos = await Gallery.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(photos);
    } catch (error) {
        console.error("Error fetching photos:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Delete a photo
// @route   DELETE /manora/gallery/:id
// @access  Private
export const deletePhoto = async (req, res) => {
    try {
        const photo = await Gallery.findById(req.params.id);

        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }

        // Check user ownership
        if (photo.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(photo.cloudinary_id);

        // Delete from DB
        await photo.deleteOne();

        res.status(200).json({ id: req.params.id, message: "Photo deleted" });
    } catch (error) {
        console.error("Error deleting photo:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Upload multiple photos
// @route   POST /manora/gallery/batch
// @access  Private
export const uploadMultiplePhotos = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Please upload at least one image" });
        }

        const uploadedPhotos = [];

        for (const file of req.files) {
            // Upload to Cloudinary
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "manora_gallery" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(file.buffer);
            });

            const gallery = await Gallery.create({
                user: req.user._id,
                album: req.body.albumId,
                image_url: result.secure_url,
                cloudinary_id: result.public_id,
                caption: req.body.caption || "", // Use same caption for all or empty
            });

            uploadedPhotos.push(gallery);
        }

        res.status(201).json(uploadedPhotos);
    } catch (error) {
        console.error("Error uploading multiple photos:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


// @desc    Delete multiple photos
// @route   POST /manora/gallery/delete-batch
// @access  Private
export const deleteMultiplePhotos = async (req, res) => {
    try {
        const { photoIds } = req.body;

        if (!photoIds || !Array.isArray(photoIds) || photoIds.length === 0) {
            return res.status(400).json({ message: "No photos selected for deletion" });
        }

        const photos = await Gallery.find({ _id: { $in: photoIds } });

        // Filter photos that belong to the user
        const userPhotos = photos.filter(photo => photo.user.toString() === req.user._id.toString());

        if (userPhotos.length === 0) {
            return res.status(404).json({ message: "No authorized photos found to delete" });
        }

        // Delete from Cloudinary
        for (const photo of userPhotos) {
            if (photo.cloudinary_id) {
                await cloudinary.uploader.destroy(photo.cloudinary_id);
            }
        }

        // Delete from DB
        await Gallery.deleteMany({ _id: { $in: userPhotos.map(p => p._id) } });

        res.status(200).json({ message: `${userPhotos.length} photos deleted` });
    } catch (error) {
        console.error("Error deleting multiple photos:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
// @desc    Update photo details (caption)
// @route   PUT /manora/gallery/:id
// @access  Private
export const updatePhoto = async (req, res) => {
    try {
        const { caption } = req.body;
        const photo = await Gallery.findById(req.params.id);

        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }

        // Check user ownership
        if (photo.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        photo.caption = caption || "";
        const updatedPhoto = await photo.save();

        res.status(200).json(updatedPhoto);
    } catch (error) {
        console.error("Error updating photo:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
