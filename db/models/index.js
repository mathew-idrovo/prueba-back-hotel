const { Room, RoomSchema } = require('./room.model');

function setupModels(sequelize) {
  Room.init(RoomSchema, Room.config(sequelize));
}

module.exports = setupModels;
