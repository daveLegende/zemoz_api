import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: 'dasekay8s',
  api_key: '497877111129947',
  api_secret: 'au-_iMfepMEF8CbNkwuH-Evsb-w',
});

export { cloudinary };
