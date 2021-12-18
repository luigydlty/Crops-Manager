const mongoose = require("mongoose");

const CultivoSchema = mongoose.Schema(
    {
        NombreCultivo: { type: "string", required: true},
        Descripcion: { type: "string", required: true}
    }
);

const Cultivo = module.exports= mongoose.model("Cultivo", CultivoSchema);