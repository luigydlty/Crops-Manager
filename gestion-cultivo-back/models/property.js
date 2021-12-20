const mongoose = require("mongoose");

const PredioSchema = mongoose.Schema(
    {

        IdPredio: { type: "string", unique: true, required: true, max:10},
        IdPropietario: { type: "string", required: true},
        CantHectarea: { type: "number", required: true},
        Ubicacion: { type: "string", required: true},
        LongitudLatitud: { type: "string", required: true}
    }
);

const Predio = module.exports= mongoose.model("Predio", PredioSchema);