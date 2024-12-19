import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRECT 
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) {
            return null;
        }

        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: 'image',
                folder: 'blog'
            }
        )
        fs.unlinkSync(localFilePath)
        return response
        
    } catch (error) {
        console.log("Failed to upload on cloudinary", error);
        fs.unlinkSync(localFilePath)
        return null
    }
}

const deleteFromCloudinary = async(publicId) => {
    try {
        const result = await cloudinary.uploader.destroy('blog/' + publicId)
        console.log("Deleted from cloudinary", result);
        return result
    } catch (error) {
        console.log("Failed to delete from cloudinary", error);
        return null
    }
}

export {uploadOnCloudinary, deleteFromCloudinary}