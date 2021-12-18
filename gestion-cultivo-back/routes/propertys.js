require('dotenv').config();

// const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

router.post(
  "/register",
  body("idPredio").not().isEmpty().withMessage("El campo Nombre Cultivo es requerido"),
  body("idPropietario").not().isEmpty().withMessage("El campo Descripción es requerido"),
  body("cantidadHectareas").not().isEmpty().withMessage("El campo Descripción es requerido"),
  body("ubicacion").not().isEmpty().withMessage("El campo Descripción es requerido"),
  body("longitudLatitud").not().isEmpty().withMessage("El campo Descripción es requerido"),
  
  
  async (req, res) => {
    const { idPredio,idPropietario,cantidadHectareas,ubicacion,longitudLatitud
    } = req.body;
      
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      let property = new Property({
        IdPropietario: idPropietario,
        IdPredio: idPredio,
        CantHectarea: cantidadHectareas,
        Ubicacion: ubicacion,
        LongitudLatitud: longitudLatitud
      });
      console.log(property);
      property.save((error)=>{
        if (error) {
          res.status(400).json({ error: error });
        } else {
          res.status(201).json({ message: "Predio Creado" });
        }
      });
    }
  }
);

/* mostrar listado de usarios en API */
router.get("/", verifyToken,  async (req, res) => {
  try {
    const propertys = await Property.find();
    res.json(propertys);
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
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Predio no encontrado" });
    }
    await property.remove();
    res.json({ message: "Predio eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Predio no encontrado" });
    }
    console.log(property);
    const { idPredio,idPropietario,cantidadHectareas,ubicacion,longitudLatitud } =
    req.body;
    property.IdPropietario= idPropietario;
    property.IdPredio= idPredio;
    property.CantHectarea= cantidadHectareas;
    property.Ubicacion= ubicacion;
    property.LongitudLatitud= longitudLatitud;


    await property.save();
    console.log(property);
    res.json({ message: "Predio actualizado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
