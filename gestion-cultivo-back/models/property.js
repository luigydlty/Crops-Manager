const mongoose = require("mongoose");

const PredioSchema = mongoose.Schema(
    {
/*         IdPropietario: { 
            Identificacion: { type: "string", unique: true, required: true, max: 100},
            Nombres: { type: "string", required: true},
            Apellidos: { type: "string", required: true},
            Rol: { type: "string", required: true},
            Correo: { type: "string", required: true},
            Clave: { type: "string", required: true}
        }, */
        IdPredio: { type: "string", unique: true, required: true, max:10},
        IdPropietario: { type: "string", required: true},
        CantHectarea: { type: "number", required: true},
        Ubicacion: { type: "string", required: true},
        LongitudLatitud: { type: "string", required: true}
    }
);

const Predio = module.exports= mongoose.model("Predio", PredioSchema);