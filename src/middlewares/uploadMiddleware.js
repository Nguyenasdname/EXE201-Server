const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadDir = path.join(__dirname, '../../uploads')
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('Chỉ được upload file ảnh!'), false)
    }
}

const upload = multer({ storage, fileFilter })

// Export các variant phổ biến
module.exports = {
    upload,                              // mặc định: có thể dùng .single, .array, .fields
    uploadSingle: upload.single('image'), // hoặc 'avatar' tùy bạn
    uploadArray: upload.array('images', 30), // giới hạn 30 ảnh
    // Dành riêng cho project: nhận 2 field riêng
    uploadProjectImages: upload.fields([
        { name: 'brandImage', maxCount: 10 },
        { name: 'activityImage', maxCount: 20 }
    ])
}