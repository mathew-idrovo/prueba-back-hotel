'use strict';

const {
  RESERVATION_TABLE,
  ReservationSchema,
} = require('../models/reservation.model');
const { ROOM_TABLE, RoomSchema } = require('../models/room.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ROOM_TABLE, RoomSchema);
    await queryInterface.createTable(RESERVATION_TABLE, ReservationSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ROOM_TABLE);
    await queryInterface.dropTable(RESERVATION_TABLE);
  },
};
