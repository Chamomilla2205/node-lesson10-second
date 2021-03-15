const fs = require('fs-extra').promises;

const carService = require('../service/car.service');
const errorCodes = require('../constants/error.codes');
const errorMessage = require('../error/error.messages');
const { utils } = require('../helpers');

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const users = await carService.findAllCars(req.query);

            res.json(users);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    },

    getSingleCar: async (req, res) => {
        try {
            const { carId } = req.params;

            const user = await carService.findCarById(carId);
            res.json(user);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    },

    createNewCar: async (req, res) => {
        try {
            const { photos, docs, query: { preferLanguage = 'en' } } = req;

            const fullCar = await carService.createCar(req.body);

            if (photos.length) {
                const uploadPathArr = [];
                for (const item of photos) {
                    const { uploadPath, mainPath, pathToStatic } = utils._builder(item.name, 'photos', fullCar._id, 'cars');

                    await fs.mkdir(pathToStatic, { recursive: true });

                    await item.mv(mainPath);

                    uploadPathArr.push(uploadPath);
                }
                await carService.updateCarById(fullCar._id, { photos: uploadPathArr });
            }

            if (docs.length) {
                const uploadPathArr = [];
                for (const item of docs) {
                    const { uploadPath, mainPath, pathToStatic } = utils._builder(item.name, 'files', fullCar._id, 'cars');

                    await fs.mkdir(pathToStatic, { recursive: true });

                    await item.mv(mainPath);

                    uploadPathArr.push(uploadPath);
                }
                await carService.updateCarById(fullCar._id, { files: uploadPathArr });
            }

            res.status(errorCodes.CREATED).json(errorMessage.CAR_CREATED[preferLanguage]);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    },

    deleteOneCar: async (req, res) => {
        try {
            const { carId } = req.params;
            const { preferLanguage = 'en' } = req.query;

            await carService.deleteCarById(carId);
            res.json(errorMessage.CAR_DELETED[preferLanguage]);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    }
};
