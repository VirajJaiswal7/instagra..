import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import { httpError } from '../middleware/errorHandler.js'
// Local storage for dev. To move to Cloudinary: swap `storage` for multer-storage-cloudinary
// and make fileUrl() return file.path (the Cloudinary URL).
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_r, f, cb) => cb(null, crypto.randomBytes(12).toString('hex') + path.extname(f.originalname).toLowerCase()),
})
export const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_r, f, cb) => (/^image\/(jpeg|png|webp|gif)$/.test(f.mimetype) ? cb(null, true) : cb(httpError(400, 'Only JPG, PNG, WEBP or GIF images are allowed'))) })
export const fileUrl = (req, file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
