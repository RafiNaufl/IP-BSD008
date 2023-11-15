const { Psychologist } = require("../models");

class konselorController {
  // Konselor Controller
  static async readKonselor(req, res, next) {
    try {
      const user = await Psychologist.findAll({});

      res.status(200).json({
        message: "Berhasil baca data",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  static async readKonselorById(req, res, next) {
    try {
      const { id } = req.params;
      const konselor = await Psychologist.findOne({
        where: {
          id: id,
        },
      });

      if (!konselor) {
        throw { message: "NotFound", id };
      }

      res.status(200).json({
        message: "Berhasil baca data konselor",
        konselor,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = konselorController;
