import * as multer from 'multer';

export const multerOptions = {
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
	fileFilter: (req, file, cb) => {
		if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
			cb(new Error('Only image files are allowed!'), false);
		} else {
			cb(null, true);
		}
	},
};
