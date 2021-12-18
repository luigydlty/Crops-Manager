const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema(
    {
        Identificacion: { type: "string", unique: true, required: true, max: 10 },
        Nombres: { type: "string", required: true},
        Apellidos: { type: "string", required: true},
        Rol: { type: "string", required: true},
        Correo: { type: "string", required: true, unique: true},
        Contrasena: { type: "string", required: true}
    }
);

const Usuario = module.exports= mongoose.model("Usuario", UsuarioSchema);

