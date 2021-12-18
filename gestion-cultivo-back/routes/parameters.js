require('dotenv').config();

// const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();
const Parameter = require("../models/Parameter");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

router.post(
  "/crear/",
  body("idCultivo").not().isEmpty().withMessage("El campo IdCultivo es requerido"),
  body("valorSemilla").not().isEmpty().withMessage("El campo Valor Semilla es requerido"),
  body("valorAgua").not().isEmpty().withMessage("El campo valor de agua es requerido"),
  body("valorFertilizante").not().isEmpty().withMessage("El campo Valor Fertilizante es requerido"),
  async (req, res) => {
    const { idCultivo, valorSemilla, valorAgua, valorFertilizante } =
      req.body;
      
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      let parameter = new Parameter({
        IdCultivo: idCultivo, 
        ValorSemilla: valorSemilla, 
        ValorAgua: valorAgua, 
        ValorFertilizante: valorFertilizante
      });
      console.log(parameter);
      parameter.save((error)=>{
        if (error) {
          res.status(400).json({ error: error });
        } else {
          res.status(201).json({ message: "Parámetro creado" });
        }
      });
    }
  }
);

/* mostrar listado de usarios en API */
router.get("/", verifyToken,  async (req, res) => {
  console.log("e");
  try {
    const parameters = await Parameter.find();
    res.json(parameters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* middlware  que se utiliza para verificar el token en las rutas que requieran autenticación */
function verifyToken(req, res, next) {

  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No autorizado 1" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).json({ message: "No autorizado 2" });
  }
  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!payload) {
    return res.status(401).json({ message: "No autorizado 3" });
  }
  req.userId = payload.userId;
  next();
}

router.delete("/:id", async (req, res) => {
  try {
    const parameter = await Parameter.findById(req.params.id);
    if (!parameter) {
      return res.status(404).json({ message: "Parámetro no encontrado" });
    }
    await parameter.remove();
    res.json({ message: "Parámetro eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  
  try {
    const parameter = await Parameter.findById(req.params.id);
    if (!parameter) {
      return res.status(404).json({ message: "Parámetro no encontrado" });
    }
    console.log(parameter);
    const { idCultivo, valorSemilla, valorAgua, valorFertilizante } =
    req.body;
    parameter.IdCultivo = idCultivo;
    parameter.ValorSemilla = valorSemilla;
    parameter.ValorAgua = valorAgua;
    parameter.ValorFertilizante = valorFertilizante;
    await parameter.save();
    console.log(parameter);
    res.json({ message: "Parámetro actualizado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
