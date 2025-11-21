import express from "express";
import upload from "../middleware/upload.js";
import { getUserProfile, updateUserProfile, deleteUserProfile, changePassword } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);

router.put("/profile", authMiddleware, upload.single("profilePic"), updateUserProfile);

router.delete("/profile", authMiddleware, deleteUserProfile);

router.put("/change-password", authMiddleware, changePassword);


export default router;
