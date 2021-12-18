require("dotenv").config();

// const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();
const Config = require("../models/Config");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

router.post(
  "/register",
  body("idPredio")
    .not()
    .isEmpty()
    .withMessage("El campo ID Predio es requerido"),
  body("idCultivo")
    .not()
    .isEmpty()
    .withMessage("El campo ID Cultivo es requerido"),
  body("tiempoCultivo")
    .not()
    .isEmpty()
    .withMessage("El campo Tiempo en Cultivo es requerido"),
  body("areaCultivo")
    .not()
    .isEmpty()
    .withMessage("El campo Area de Cultivo es requerido"),
  body("cantidadSemillas")
    .not()
    .isEmpty()
    .withMessage("El campo Cantidad de Semillas es requerido"),
  body("cantidadAgua")
    .not()
    .isEmpty()
    .withMessage("El campo Cantidad de Agua es requerido"),
  body("cantidadFertilizante")
    .not()
    .isEmpty()
    .withMessage("El campo Cantidad de Fertilizante es requerido"),
  body("tiempoRecoleccion")
    .not()
    .isEmpty()
    .withMessage("El campo Tiempo en Recoleccion es requerido"),
  body("kgProyectado")
    .not()
    .isEmpty()
    .withMessage("El campo Kg Proyectado es requerido"),
  body("tiempoMinimo")
    .not()
    .isEmpty()
    .withMessage("El campo Tiempo de Espera Minimo es requerido"),
  body("fechaSiembra")
    .not()
    .isEmpty()
    .withMessage("El campo Fecha de Siembra es requerido"),
    body("fechaCosecha")
    .not()
    .isEmpty()
    .withMessage("El campo Fecha de Cosecha es requerido"),
  async (req, res) => {
    const {
      idPredio,
      idCultivo,
      tiempoCultivo,
      areaCultivo,
      cantidadSemillas,
      cantidadAgua,
      cantidadFertilizante,
      tiempoRecoleccion,
      kgProyectado,
      tiempoMinimo,
      fechaSiembra,
      fechaCosecha,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      let config = new Config({
        IdPredio: idPredio,
        IdCultivo: idCultivo,
        TiempoCultivo: tiempoCultivo,
        AreaCultivo: areaCultivo,
        CantidadSemillas: cantidadSemillas,
        CantidadAgua: cantidadAgua,
        CantidadFertilizante: cantidadFertilizante,
        TiempoRecoleccion: tiempoRecoleccion,
        KgProyectado: kgProyectado,
        TiempoMinimo: tiempoMinimo,
        FechaSiembra: fechaSiembra,
        FechaCosecha: fechaCosecha,
      });
      console.log(config);
      config.save((error) => {
        if (error) {
          res.status(400).json({ error: error });
        } else {
          res.status(201).json({ message: "Configuración creada" });
        }
      });
    }
  }
);

/* mostrar listado de usarios en API */
router.get("/", verifyToken, async (req, res) => {
  try {
    const configs = await Config.find();
    res.json(configs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* middlware  que se utiliza para verificar el token en las rutas que requieran autenticación */
function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No autorizado " });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).json({ message: "No autorizado " });
  }
  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!payload) {
    return res.status(401).json({ message: "No autorizado " });
  }
  req.userId = payload.userId;
  next();
}

router.delete("/:id", async (req, res) => {
  try {
    const config = await Config.findById(req.params.id);
    if (!config) {
      return res.status(404).json({ message: "Configuración no encontrada" });
    }
    await config.remove();
    res.json({ message: "Configuración eliminada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const config = await Config.findById(req.params.id);
    if (!config) {
      return res.status(404).json({ message: "Configuración no encontrada" });
    }
    console.log(config);
    const {
      idPredio,
      idCultivo,
      tiempoCultivo,
      areaCultivo,
      cantidadSemillas,
      cantidadAgua,
      cantidadFertilizante,
      tiempoRecoleccion,
      kgProyectado,
      tiempoMinimo,
      fechaSiembra,
      fechaCosecha,
    } = req.body;
    (config.IdPredio = idPredio),
      (config.IdCultivo = idCultivo),
      (config.TiempoCultivo = tiempoCultivo),
      (config.AreaCultivo = areaCultivo),
      (config.CantidadSemillas = cantidadSemillas),
      (config.CantidadAgua = cantidadAgua),
      (config.CantidadFertilizante = cantidadFertilizante),
      (config.TiempoRecoleccion = tiempoRecoleccion),
      (config.KgProyectado = kgProyectado),
      (config.TiempoMinimo = tiempoMinimo),
      (config.FechaSiembra = fechaSiembra),
      (config.FechaCosecha = fechaCosecha);
    await config.save();
    console.log(config);
    res.json({ message: "Configuración actualizada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
