import fs from "fs";
import path from "path";
import User from "../models/user.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, mobile, address } = req.body;

    const updateData = { name, mobile, address };

    if (req.file) {
      updateData.profilePic = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete profile picture file (if exists)
    if (user.profilePic) {
      const filePath = path.join("uploads", path.basename(user.profilePic));
      fs.unlink(filePath, (err) => {
        if (err) console.log("Failed to delete profile picture:", err);
      });
    }

    // Delete user from DB
    await User.findByIdAndDelete(req.user.id);

    return res.json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};