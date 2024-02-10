const cloudinary = require('cloudinary').v2;

const configureCloudinary = () => {
    cloudinary.config({
        cloud_name: 'your_cloud_name',
        api_key: 'your_api_key',
        api_secret: 'your_api_secret'
    });
}

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};

const uploadImage = async (image, callback) => {
    cloudinary.uploader.upload(image, opts, callback);
}

module.exports = { configureCloudinary, uploadImage };
