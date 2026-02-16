
import express from "express";
import { createAlbum, getAlbums, getAlbumDetails, deleteAlbum, updateAlbum } from "../controllers/albumController.js";
import { protect } from "../middleware/authMiddleware.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protect, createAlbum);
router.get("/", protect, getAlbums);
router.get("/:id", protect, getAlbumDetails);
router.put("/:id", protect, upload.single("coverImage"), updateAlbum);
router.delete("/:id", protect, deleteAlbum);

export default router;
