const roomModel = require('../schemas/Room');

const create = async (data) => {
    if (!data.title) {
        throw new Error('Missing required field: title');
    }

    const newRoom = new roomModel(data);
    return await newRoom.save();
};

const find = async (data) => {
    return await roomModel.find(data);
};

const findOne = async (data) => {
    return await roomModel.findOne(data);
};

const findById = async (id) => {
    return await roomModel.findById(id);
};

const findByIdAndUpdate = async (id, data) => {
    return await roomModel.findByIdAndUpdate(id, data, { new: true });
};

const addUser = async (room, user, socket) => {
    // Check if user and room is valid
    if (!user._id || !room._id) {
        throw new Error('Invalid user or room');
    }

    // Push a new connection object(i.e. {userId + socketId})
    const conn = { 'userId': user._id, 'socketId': socket.id };
    room.connections.push(conn);
    return await room.save();
};

module.exports = {
    create,
    find,
    findOne,
    findById,
    findByIdAndUpdate,
    addUser
};
