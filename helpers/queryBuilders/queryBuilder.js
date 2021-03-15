module.exports = {
    makeQuery: (query) => {
        const { limit = 5, page = 1, sortBy = 'createAt', order = 'asc', ...filters } = query;
        const skip = (page - 1) * limit;
        const keys = Object.keys(filters);
        const filterObject = {};

        const orderBy = order === 'asc' ? -1 : 1;

        const sort = { [sortBy]: orderBy };
        return { skip, keys, filterObject, sort, limit, page, filters };
    }
};
