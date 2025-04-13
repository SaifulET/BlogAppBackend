import Image from "../model/ImgModel.js";
import fs from "fs";
import path from "path";

export const uploadImage = async (req, res) => {
    try {
        console.log("ldk;lsd")
        console.log("Received Request: ", req.body);

        let newImage;

        if (req.file) {
            // File upload case
            newImage = new Image({
                filename: req.file.filename,
                filepath: `/images/${req.file.filename}`, // Store the file path
            });
        } else if (req.body.imageUrl) {
            // Image URL case
            newImage = new Image({
                imageUrl: req.body.imageUrl, // Store the external URL
            });
        } else {
            return res.status(400).json({ message: "Provide a file or an image URL." });
        }

        await newImage.save();
        res.status(201).json({ message: "Image uploaded successfully", newImage });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// Fetch all images
export const getImages = async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getImageById =async (req, res) => {
    try {
        const image = await Image.findById({_id:req.params.id});
        if (!image) return res.status(404).json({ message: "Image not found" });
        res.json(image);
    } catch (error) {
        res.status(500).json({ error: "Error fetching image" });
    }
};
