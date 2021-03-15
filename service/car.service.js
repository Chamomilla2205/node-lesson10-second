const Car = require('../dataBase/models/Cars');
const {queryBuilder} = require('../helpers/queryBuilders')

module.exports = {
    findAllCars: async (query = {}) => {
        const {skip, keys, filterObject, sort, limit, page, filters} = queryBuilder.makeQuery(query)

        keys.forEach((key) => {
            switch (key) {
                case 'priceGte':
                    filterObject.price = Object.assign({}, filterObject.price, { $gte: filters.priceGte });
                    break;
                case 'priceLte':
                    filterObject.price = Object.assign({}, filterObject.price, {$lte: filters.priceLte});
                    break;
                case 'prodYearGte':
                    filterObject.prodYear = Object.assign({}, filterObject.prodYear, { $gte: filters.prodYearGte });
                    break;
                case 'prodYearLte':
                    filterObject.prodYear = Object.assign({}, filterObject.prodYear, {$lte: filters.prodYearLte});
                    break;
                case 'category':
                    const categories = filters.category.split(';');
                    filterObject.category = {$in: categories};
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        })
        const data = await Car.find(filterObject).limit(limit).sort(sort).skip(skip);
        const count = await Car.countDocuments(filterObject);
        const pagesCount = Math.ceil(count / limit);
        return {
            data,
            limit,
            pagesCount,
            page,
            count
        }
    },

    findCarById: (carId) => Car.findById(carId),

    createCar: (carObject) => Car.create(carObject),

    updateCarById: (carId, carObject) => Car.updateOne({ _id: carId }, { $set: carObject }),

    deleteCarById: (carId) => Car.findByIdAndDelete(carId)
};
