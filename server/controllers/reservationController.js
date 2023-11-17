const { Reservation, Psychologist, User, Topic } = require("../models");
const { sendEmailReservation } = require("../api/nodeMailer");

class reservationController {
  static async createReservation(req, res, next) {
    try {
      const {
        date,
        time,
        duration,
        session_count,
        meetingType,
        description,
        topicId,
        psychologistId,
      } = req.body;

      const user = await User.findByPk(req.user.id);
      const topic = await Topic.findByPk(topicId);
      const psychologist = await Psychologist.findByPk(psychologistId);

      // Buat reservasi
      const newReservation = await Reservation.create({
        date,
        time,
        duration,
        session_count,
        meetingType,
        description,
        userId: req.user.id,
        topicId,
        psychologistId,
      });

      if (newReservation) {
        const successMessage = `Terima kasih ${user.username} telah Reservasi Layanan Hacktiv Health. 
        Berikut detail reservasi anda :
        Topic : ${topic.topic_name},
        Konselor : ${psychologist.name}
        Date : ${date},
        Time : ${time},
        Duration: ${duration} jam,
        Meeting Type : ${meetingType},
        Keluhan : ${description},
        `;

        sendEmailReservation(user.email, "Reservasi Berhasil", successMessage);

        res.status(201).json({
          message: "Reservation created successfully",
          reservation: newReservation,
        });
      } else {
        throw { message: "RegisterError" };
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = reservationController;
