// @ts-nocheck 
"use server";

import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';

export const saveImage = async (image: File | string): Promise<string | { error: string; status: number }> => {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        return {
            error: 'Missing Cloudinary configuration',
            status: 500
        };
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        let buffer: Buffer;

        if (typeof image === 'string') {
            // If the image is a URL, fetch the image and convert it to a buffer
            const response = await axios.get(image, { responseType: 'arraybuffer' });
            buffer = Buffer.from(response.data);
        } else {
            // If the image is a File, convert it to a buffer
            const arrayBuffer = await image.arrayBuffer();
            buffer = Buffer.from(arrayBuffer);
        }

        const uploadResult = await new Promise<{ secure_url?: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, (err, result) => {
                if (err) {
                    console.error('Error uploading image to Cloudinary:', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            }).end(buffer);
        });

        if (!uploadResult || !uploadResult.secure_url) {
            return {
                error: 'Failed to upload image to Cloudinary',
                status: 500
            };
        }

        return uploadResult.secure_url;

    } catch (error) {
        console.error('Failed to save image.', error);
        return {
            error: 'Failed to save image.',
            status: 500
        };
    }
};
