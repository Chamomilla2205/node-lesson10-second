const User = require('../dataBase/models/User');
const { queryBuilder: { queryBuilder } } = require('../helpers')
require('../dataBase/models/Cars');

module.exports = {
    findAllUsers: async (query = {}) => {
        const { skip, keys, filterObject, sort, limit, page, filters } = await queryBuilder.makeQuery(query);

        keys.forEach((key) => {
            switch (key) {
                case 'priceGte':
                    filterObject.price = Object.assign({}, filterObject.price, { $gte: +filters.priceGte });
                    break;
                case 'priceLte':
                    filterObject.price = Object.assign({}, filterObject.price, { $lte: +filters.priceLte });
                    break;
                case 'bornYearGte':
                    filterObject.bornYear = Object.assign({}, filterObject.bornYear, { $gte: +filters.bornYearGte });
                    break;
                case 'bornYearLte':
                    filterObject.bornYear = Object.assign({}, filterObject.bornYear, { $lte: +filters.bornYearLte });
                    break;
                case 'category':
                    const categories = filters.category.split(';');
                    filterObject.category = { $in: categories };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });
        const users = await User.find(filterObject).limit(limit).skip(skip).sort(sort);
        const count = await User.countDocuments(filterObject);
        const pagesCount = Math.ceil(count / limit);

        return {
            count,
            limit,
            page,
            data: users,
            pagesCount
        };
    },

    findUserById: (userId) => User.findById(userId),

    createUser: (userObject) => User.create(userObject),

    updateUserById: (userId, userObject) => User.updateOne({ _id: userId }, { $set: userObject }),

    deleteUserById: (userId) => User.findByIdAndDelete(userId)
};
