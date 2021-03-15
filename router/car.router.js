const router = require('express').Router();
const carController = require('../controller/car.controller');
const { carMiddleware, fileMiddleware } = require('../middleware');

router.get('/', carController.getAllCars);
router.post('/',
    fileMiddleware.checkUrl,
    fileMiddleware.checkFile,
    fileMiddleware.checkCarPhotos,
    fileMiddleware.checkDocs,
    carMiddleware.areCarValid,
    carController.createNewCar);

router.get('/:carId', carMiddleware.checkValidId, carController.getSingleCar);
router.delete('/:carId', carMiddleware.checkValidId, carController.deleteOneCar);

module.exports = router;
