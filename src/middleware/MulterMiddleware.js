import multer from 'multer';

const storage = multer.memoryStorage(); // no disk writing
export const upload = multer({ storage });
