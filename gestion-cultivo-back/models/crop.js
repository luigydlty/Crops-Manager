const mongoose = require("mongoose");

const CultivoSchema = mongoose.Schema(
    {   IdCultivo: { type: "string", unique: true, required: true, max:10},
        NombreCultivo: { type: "string", required: true},
        Descripcion: { type: "string", required: true}
    }
);

const Cultivo = module.exports= mongoose.model("Cultivo", CultivoSchema);