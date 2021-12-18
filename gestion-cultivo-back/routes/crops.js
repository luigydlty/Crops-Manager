require('dotenv').config();

// const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();
const Crop = require("../models/Crop");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

router.post(
  "/crear",
  body("idCultivo").not().isEmpty().withMessage("El campo Id Cultivo es requerido"),
  body("nombreCultivo").not().isEmpty().withMessage("El campo Nombre Cultivo es requerido"),
  body("descripcion").not().isEmpty().withMessage("El campo Descripción es requerido"),
  async (req, res) => {
    const { idCultivo,nombreCultivo, descripcion } =
      req.body;
      
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      let crop = new Crop({
        IdCultivo:idCultivo,
        NombreCultivo: nombreCultivo,
        Descripcion: descripcion,
      });
      console.log(crop);
      crop.save((error)=>{
        if (error) {
          res.status(400).json({ error: error });
        } else {
          res.status(201).json({ message: "Cultivo creado" });
        }
      });
    }
  }
);

/* mostrar listado de usarios en API */
router.get("/", verifyToken,  async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
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
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ message: "Cultivo no encontrado" });
    }
    await crop.remove();
    res.json({ message: "Cultivo eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ message: "Cultivo no encontrado" });
    }
    console.log(crop);
    const { nombreCultivo, descripcion } =
    req.body;
    crop.NombreCultivo = nombreCultivo;
    crop.Descripcion = descripcion;
    await crop.save();
    console.log(crop);
    res.json({ message: "Cultivo actualizado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
