const { Model, DataTypes } = require('sequelize');
const RESERVATION_TABLE = 'reservations';

const ReservationSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roomId: {
    field: 'room_id',
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  guestName: {
    field: 'guest_name',
    type: DataTypes.STRING,
    allowNull: false,
  },
  startTime: {
    field: 'start_time',
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    field: 'end_time',
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

class Reservation extends Model {
  static associate(models) {
    this.belongsTo(models.Room, { as: 'room' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: RESERVATION_TABLE,
      modelName: 'Reservation',
      timestamps: true,
    };
  }
}

module.exports = { RESERVATION_TABLE, ReservationSchema, Reservation };
