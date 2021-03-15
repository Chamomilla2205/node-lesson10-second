const {
    constants: {
        PHOTO_MAX_SIZE,
        PHOTO_MIMETYPES,
        DOC_MAX_SIZE,
        DOC_MIMETYPES,
        VIDEO_MAX_SIZE,
        VIDEO_MIMETYPES
    }
} = require('../constants');

module.exports = {
    checkUrl: (req, res, next) => {
        const { baseUrl } = req.params;
        if (baseUrl === '/cars') {
            req.obj = { photo: 20, doc: 10 };
        }
        if (baseUrl === '/users') {
            req.obj = { photo: 1, doc: 10 };
        }
        next();
    },

    checkFile: (req, res, next) => {
        try {
            const { files } = req;
            const docs = [];
            const photos = [];
            const videos = [];
            const allFiles = Object.values(files);

            for (let i = 0; i < allFiles.length; i++) {
                const { name, size, mimetype } = allFiles[i];
                if (PHOTO_MIMETYPES.includes(mimetype)) {
                    if (PHOTO_MAX_SIZE < size) {
                        throw new Error(`file ${name} is too big`);
                    }

                    photos.push(allFiles[i]);
                } else if (DOC_MIMETYPES.includes(mimetype)) {
                    if (DOC_MAX_SIZE < size) {
                        throw new Error(`file ${name} is too big`);
                    }

                    docs.push(allFiles[i]);
                } else if (VIDEO_MIMETYPES.includes(mimetype)) {
                    if (VIDEO_MAX_SIZE < size) {
                        throw new Error(`file ${name} is too big`);
                    }

                    videos.push(allFiles[i]);
                } else {
                    throw new Error('Not valid file');
                }
            }
            req.docs = docs;
            req.photos = photos;
            req.videos = videos;
            next();
        } catch (err) {
            next(err);
        }
    },

    checkUserAvatar: (req, res, next) => {
        try {
            const { photos } = req;

            if (photos.length > 1) {
                throw new Error('You can upload only one picture');
            }
            [req.avatar] = photos;
            next();
        } catch (err) {
            next(err);
        }
    },

    checkDocs: (req, res, next) => {
        try {
            const { docs } = req;
            if (docs.length > 10) {
                throw new Error('You can update 10 files max');
            }
            req.docs = docs;
            next();
        } catch (err) {
            next(err);
        }
    },

    checkCarPhotos: (req, res, next) => {
        try {
            const { photos } = req;
            if (photos.length > 20) {
                throw new Error(`You can upload 20 pictures max`);
            }
            req.photos = photos;
            next();
        } catch (err) {
            next(err);
        }
    },
};
