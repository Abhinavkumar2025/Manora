
import Album from "../models/Album.js";
import Gallery from "../models/gallery.js";
import cloudinary from "../config/cloudinary.js";

// @desc    Create a new album (trip)
// @route   POST /manora/albums
// @access  Private
export const createAlbum = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and Description are required" });
        }

        const album = await Album.create({
            user: req.user._id,
            title,
            description,
        });

        res.status(201).json(album);
    } catch (error) {
        console.error("Error creating album:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get user's albums
// @route   GET /manora/albums
// @access  Private
export const getAlbums = async (req, res) => {
    try {
        const albums = await Album.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(albums);
    } catch (error) {
        console.error("Error fetching albums:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get album details and photos
// @route   GET /manora/albums/:id
// @access  Private
export const getAlbumDetails = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);

        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }

        if (album.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const photos = await Gallery.find({ album: req.params.id }).sort({ createdAt: -1 });

        res.status(200).json({ album, photos });
    } catch (error) {
        console.error("Error fetching album details:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Delete an album and all its photos
// @route   DELETE /manora/albums/:id
// @access  Private
export const deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);

        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }

        // Check user ownership
        if (album.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        // Find all photos in the album
        const photos = await Gallery.find({ album: req.params.id });

        // Delete photos from Cloudinary
        for (const photo of photos) {
            if (photo.cloudinary_id) {
                await cloudinary.uploader.destroy(photo.cloudinary_id);
            }
        }

        // Delete photos from DB
        await Gallery.deleteMany({ album: req.params.id });

        // Delete album from DB
        await album.deleteOne();

        res.status(200).json({ id: req.params.id, message: "Album deleted" });
    } catch (error) {
        console.error("Error deleting album:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Update an album
// @route   PUT /manora/albums/:id
// @access  Private
export const updateAlbum = async (req, res) => {
    try {
        const { title, description } = req.body;
        const album = await Album.findById(req.params.id);

        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }

        // Check user ownership
        if (album.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        // Update fields
        if (title) album.title = title;
        if (description) album.description = description;

        // Handle cover image upload if present
        if (req.file) {
            // Upload new cover to Cloudinary
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "manora_album_covers" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(req.file.buffer);
            });
            album.coverImage = result.secure_url;
        } else if (req.body.removeCoverImage === 'true') {
            // Remove cover image
            album.coverImage = "";
        }

        const updatedAlbum = await album.save();
        res.status(200).json(updatedAlbum);

    } catch (error) {
        console.error("Error updating album:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
