const boom = require('@hapi/boom');
const { models, Sequelize } = require('../libs/sequelize');
const { Op } = Sequelize;

class ReservationService {
  async create(data) {
    const overlap = await models.Reservation.findOne({
      where: {
        roomId: data.roomId,
        [Op.or]: [
          { startTime: { [Op.between]: [data.startTime, data.endTime] } },
          { endTime: { [Op.between]: [data.startTime, data.endTime] } },
          {
            startTime: { [Op.lte]: data.startTime },
            endTime: { [Op.gte]: data.endTime },
          },
        ],
      },
    });
    if (overlap) {
      throw boom.conflict('Time slot not available for this room');
    }
    await models.Room.update(
      { status: 'occupied' },
      { where: { id: data.roomId } },
    );
    return await models.Reservation.create(data);
  }

  async find(query) {
    const { page = 1, limit = 10, roomId } = query;
    const offset = (page - 1) * limit;
    const where = {};
    if (roomId) where.roomId = roomId;
    const { count, rows } = await models.Reservation.findAndCountAll({
      where,
      offset,
      limit,
      include: ['room'],
    });
    return { total: count, reservations: rows };
  }

  async findOne(id) {
    const reservation = await models.Reservation.findByPk(id, {
      include: ['room'],
    });
    if (!reservation) throw boom.notFound('Reservation not found');
    return reservation;
  }

  async update(id, changes) {
    const reservation = await this.findOne(id);
    return await reservation.update(changes);
  }

  async delete(id) {
    const reservation = await this.findOne(id);
    await reservation.destroy();
    return { id };
  }
}

module.exports = ReservationService;
