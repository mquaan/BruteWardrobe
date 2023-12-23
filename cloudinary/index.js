import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name: "dikez764l",
    api_key: "756811253791826",
    api_secret: "Ftugqv0PxE7PO-rbcmpSqUPUAD0"
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    // folder: "AdsManagement", // Optional: Set a folder name in Cloudinary
    // allowedFormats: ["jpg", "png", "jpeg"],
    // transformation: [{ width: 500, height: 500, crop: "limit" }],
    params: {
        folder: 'BruteWardDrobe',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

export { cloudinary, storage };