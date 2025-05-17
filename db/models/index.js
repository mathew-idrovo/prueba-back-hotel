const { Room, RoomSchema } = require('./room.model');
const { Reservation, ReservationSchema } = require('./reservation.model');

function setupModels(sequelize) {
  Room.init(RoomSchema, Room.config(sequelize));
  Reservation.init(ReservationSchema, Reservation.config(sequelize));

  Room.associate(sequelize.models);
  Reservation.associate(sequelize.models);
}

module.exports = setupModels;
