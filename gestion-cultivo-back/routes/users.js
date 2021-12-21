require('dotenv').config();

const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

router.post(
  "/register",
  body("identificacion").not().isEmpty().withMessage("El campo identificacion es requerido"),
  body("nombres").not().isEmpty().withMessage("El campo nombres es requerido"),
  body("apellidos").not().isEmpty().withMessage("El campo apellidos es requerido"),
  body('rol').not().isEmpty().withMessage("El campo rol es requerido"),
  body('correo').not().isEmpty().withMessage("El campo correo es requerido"),
  body('contrasena').not().isEmpty().withMessage("El campo contrasena es requerido"),
  async (req, res) => {
    const { identificacion, nombres, apellidos, rol, correo, contrasena } =
      req.body;
      
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      let user = new User({
        Identificacion: identificacion,
        Nombres: nombres,
        Apellidos: apellidos,
        Rol: rol,
        Correo: correo,
        Contrasena: contrasena,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.Contrasena, salt, (err, hash) => {
          if (err) throw err;
          user.Contrasena = hash;
          user.save((error)=>{
            if (error) {
              res.status(400).json({ error: error });
            } else {
              res.status(201).json({ message: "Usuario creado" });
            }
          });
        });
      });
    }
  }
);

/* mostrar listado de usarios en API */
router.get("/", verifyToken,  async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post(
  "/login",
  body("correo").not().isEmpty().withMessage("El campo correo es requerido"),
  body("contrasena").not().isEmpty().withMessage("El campo contrasena es requerido"),
  async (req, res) => {
    const { correo, contrasena } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const user = await User.findOne({ Correo: correo });
        if (!user) {
          return res.status(400).json({ message: "Usuario no encontrado" });
        }
        bcrypt.compare(contrasena, user.Contrasena, (err, result) => {
          if (err) {
            return res.status(400).json({ message: "Contraseña errada" });//cambió de 401 a 400
          }
          if (result) {
            const token = jwt.sign(
              { userId: user.id },
              process.env.ACCESS_TOKEN_SECRET,
            );
            return res.status(200).json({ token: token,rol:user.Rol,user:user }); //mostrar datos perfil
          }
          return res.status(401).json({ message: "Contraseña incorrecta" });
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  }
);

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
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await user.remove();
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    console.log(user);
    const {nombres, apellidos, rol, correo } =
      req.body;
/*     user.Identificacion = identificacion; */
    user.Nombres = nombres;
    user.Apellidos = apellidos;
    user.Rol = rol;
    user.Correo = correo;
/* user.Contrasena = contrasena; */
    await user.save();
    console.log(user);
    res.json({ message: "Usuario actualizado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
