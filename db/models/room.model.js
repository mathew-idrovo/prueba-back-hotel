const { Model, DataTypes } = require('sequelize');

const ROOM_TABLE = 'rooms';

const RoomSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roomNumber: {
    type: DataTypes.STRING(4),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  type: {
    type: DataTypes.ENUM('single', 'double', 'suite'),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: DataTypes.ENUM('available', 'maintenance', 'occupied'),
    defaultValue: 'available',
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    field: 'updated_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

class Room extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROOM_TABLE,
      modelName: 'Room',
      timestamps: false,
    };
  }
}
module.exports = { ROOM_TABLE, Room, RoomSchema };
