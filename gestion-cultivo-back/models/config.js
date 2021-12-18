const mongoose = require("mongoose");

const ConfiguracionSchema = mongoose.Schema(
    {
        IdPredio: { type: "string", unique: true, required: true, max:10},
        IdCultivo: { type: "string", required: true},
        TiempoCultivo: { type: "string", required: true},
        AreaCultivo: { type: "number", required: true},
        CantidadSemillas: { type: "number", required: true},
        CantidadAgua: { type: "number", required: true},
        CantidadFertilizante: { type: "number", required: true},
        TiempoRecoleccion: { type: "string", required: true},
        KgProyectado: { type: "number", required: true},
        TiempoMinimo: { type: "number", required: true},
        FechaSiembra: { type: "string", required: true},
        FechaCosecha: { type: "string", required: true},
    }
);
const Configuracion = module.exports= mongoose.model("Configuracion", ConfiguracionSchema);