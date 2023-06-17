const userModel = require('../schemas/User');

const create = async (data) => {
    if (!data.username) {
        throw new Error('Missing required field: username');
    }

    const newUser = new userModel(data);
    return await newUser.save();
};

const findOne = async (data) => {
    return await userModel.findOne(data);
};

const findById = async (id) => {
    return await userModel.findById(id);
};

const findOrCreate = async (data) => {
    if (!data.username) {
        throw new Error('Missing required field: username');
    }

    let user = await findOne({ 'username': data.username });

    if (!user) {
        user = await create(data);
    }

    return user;
};

module.exports = {
    create,
    findOne,
    findById,
    findOrCreate
};
