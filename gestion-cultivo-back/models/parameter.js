const mongoose = require("mongoose");

const ParametroSchema = mongoose.Schema(
    {
/*         Cultivo: { 
            Id: { type: "string", unique: true, required: true, max: 100},
            NombreCultivo: { type: "string", required: true},
            Descripcion: { type: "string", required: true}
        }, */
        NombreCultivo: { type: "string", required: true},
        ValorSemilla: { type: "number", required: true},
        ValorAgua: { type: "number", required: true},
        ValorFertilizante: { type: "number", required: true}
    }
);

const Parametro = module.exports= mongoose.model("Parametro", ParametroSchema);