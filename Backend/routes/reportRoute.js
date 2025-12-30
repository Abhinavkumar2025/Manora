import express from 'express';
import upload from "../middleware/upload.js";
import { createReport,getReports } from "../controllers/reportController.js";

const router = express.Router();

router.post('/report',upload.single("image"),createReport);
router.get("/report", getReports); 


export default router;