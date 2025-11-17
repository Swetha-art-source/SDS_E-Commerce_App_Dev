import express from "express";
import upload from "../middleware/upload.js";
import { getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);

router.put("/profile", authMiddleware, upload.single("profilePic"), updateUserProfile);

router.delete("/profile", authMiddleware, deleteUserProfile);


export default router;
