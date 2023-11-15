const { Reservation } = require("../models");

const reservationController = {
  async createReservation(req, res, next) {
    try {
      const {
        date_time,
        duration,
        session_count,
        meetingType,
        description,
        userId,
        topicId,
        psychologistId,
      } = req.body;

      const newReservation = await Reservation.create({
        date_time,
        duration,
        session_count,
        meetingType,
        description,
        userId,
        topicId,
        psychologistId,
      });

      res.status(201).json({
        message: "Reservation created successfully",
        reservation: newReservation,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = reservationController;
