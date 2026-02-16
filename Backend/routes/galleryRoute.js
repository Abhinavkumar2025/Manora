
import express from "express";
import { uploadPhoto, getMyPhotos, deletePhoto, uploadMultiplePhotos, deleteMultiplePhotos, updatePhoto } from "../controllers/galleryController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), uploadPhoto);
router.post("/batch", protect, upload.array("images", 20), uploadMultiplePhotos);
router.post("/delete-batch", protect, deleteMultiplePhotos);
router.get("/mine", protect, getMyPhotos);
router.delete("/:id", protect, deletePhoto);
router.put("/:id", protect, updatePhoto);

export default router;
