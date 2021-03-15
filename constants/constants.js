module.exports = {
    CURRENT_YEAR: new Date().getFullYear(),
    AUTHORIZATION: 'Authorization',

    PHOTO_MAX_SIZE: 3 * 1024 * 1024,
    PHOTO_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/webp',
        'image/jfif'
    ],

    DOC_MAX_SIZE: 5 * 1024 * 1024,
    DOC_MIMETYPES: [
        'application/msword', // DOC
        'application/pdf', // .pdf
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xls
        'application/vnd.openxmlformats-officedocument.wordprocessingml.sheet', // DOC 2007
        'text/plain' // .txt
    ],

    VIDEO_MAX_SIZE: 20 * 1024 * 1024,
    VIDEO_MIMETYPES: [
        'video/mpeg',
        'video/mp4',
    ]
};
