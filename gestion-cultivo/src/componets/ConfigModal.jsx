import React from "react";
import MainModal from "./MainModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { updateConfig,createConfig,getCrops,getProperty} from "../services/api";

const ConfigModal = ({ modal, setModal, modalType,config,updateConfigs}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [crops, setCrops] = React.useState([]);
  const [properties, setProperties] = React.useState([]);

  const formik = useFormik({
    initialValues: {
        idPredio: config?config.idPredio:"",
        idCultivo: config?config.idCultivo:"",
        tiempoCultivo: config?config.tiempoCultivo:"",
        areaCultivo: config?config.areaCultivo:"" ,
        cantidadSemillas: config?config.cantidadSemillas:"",
        cantidadAgua: config?config.cantidadAgua:"",
        cantidadFertilizante: config?config.cantidadFertilizante:"",
        tiempoRecoleccion: config?config.tiempoRecoleccion:"",
        kgProyectado: config?config.kgProyectado:"",
        tiempoMinimo: config?config.tiempoMinimo:"",
        fechaSiembra: config?config.fechaSiembra:"",
        fechaCosecha: config?config.fechaCosecha:"",
    },
    validationSchema: Yup.object({
        idPredio: Yup.string().required("El campo es requerido"),
        idCultivo: Yup.string().required("El campo es requerido"),
        tiempoCultivo: Yup.string().required("El campo es requerido"),
        areaCultivo: Yup.string().required("El campo es requerido"),
        cantidadSemillas: Yup.string().required("El campo es requerido"),
        cantidadAgua: Yup.string().required("El campo es requerido"),
        cantidadFertilizante: Yup.string().required("El campo es requerido"),
        tiempoRecoleccion: Yup.string().required("El campo es requerido"),
        kgProyectado: Yup.string().required("El campo es requerido"),
        tiempoMinimo: Yup.string().required("El campo es requerido"),
        fechaSiembra: Yup.string().required("El campo es requerido"),
        fechaCosecha: Yup.string().required("El campo es requerido"),
    }),
    onSubmit: async (values,{resetForm}) => {
      const data = {
        idPredio: values.idPredio,
        idCultivo: values.idCultivo,
        tiempoCultivo: values.tiempoCultivo,
        areaCultivo: values.areaCultivo,
        cantidadSemillas: values.cantidadSemillas,
        cantidadAgua: values.cantidadAgua,
        cantidadFertilizante: values.cantidadFertilizante,
        tiempoRecoleccion: values.tiempoRecoleccion,
        kgProyectado: values.kgProyectado,
        tiempoMinimo: values.tiempoMinimo,
        fechaSiembra: values.fechaSiembra,
        fechaCosecha: values.fechaCosecha,
      };

      if(modalType === "create"){
        await createConfig(data)
          .then((res) => {
            if (res.status === 201) {
              enqueueSnackbar('¡Bien hecho! Configuración creada exitosamente', { variant:'success'});
              updateConfigs();
              setModal(false);
            }else{
              enqueueSnackbar('¡Error! La configuración no pudo ser creada', { variant:'error'});
            }
            resetForm();
          })
          .catch((err) => {
            enqueueSnackbar(err.response.data.message, {
              variant: "error",
            });
          });
      }else{
        await updateConfig(config.id,data)
          .then((res) => {
            enqueueSnackbar("Configuración actualizada con éxito", {
              variant: "success",
            });
            updateConfigs();
            resetForm();
            setModal(false);
          })
          .catch((err) => {
            enqueueSnackbar(err.response.data.message, {
              variant: "error",
            });
          });
      } 
    },
  });

  /* Traer datos de la colección de predios para uso en select */
  const traerPredio = async () => {
    await getProperty()
      .then((res) => {
        setProperties(res);
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
        });
      });
  };

  /* Traer datos de la colección de cultivos para uso en select */
  const traerCultivo = async () => {
    await getCrops()
      .then((res) => {
        setCrops(res);
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
        });
      });
  };


  useEffect(() => {
    if (modalType === "update") {
      formik.setValues({
        idPredio: config.idPredio || "",
        idCultivo: config.idCultivo || "",
        tiempoCultivo: config.tiempoCultivo || "",
        areaCultivo: config.areaCultivo || "",
        cantidadSemillas: config.cantidadSemillas || "",
        cantidadAgua: config.cantidadAgua || "",
        cantidadFertilizante: config.cantidadFertilizante || "",
        tiempoRecoleccion: config.tiempoRecoleccion || "",
        kgProyectado: config.kgProyectado || "",
        tiempoMinimo: config.tiempoMinimo || "",
        fechaSiembra: config.fechaSiembra || "",
        fechaCosecha: config.fechaCosecha || "",
      });
    }
    traerPredio();
    traerCultivo();

  }, [modalType, config]);

  console.log(crops);
  return (
    <MainModal
      show={modal}
      setShow={setModal}
      title={
        modalType === "create"
          ? "Crear Configuración"
          : "Actualizar Configuración"
      }
    >
      <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
          <label htmlFor="idPredio" className="col-form-label">
            ID Predio:
          </label>
          <select
            htmlFor="idPredio"
            className="form-control"
            id="idPredio"
            name="idPredio"
            value={formik.values.idPredio}
            onChange={formik.handleChange}
          >
            <option value="">Seleccione un predio</option>
            {properties.map((property) => (
              <option key={property.IdPredio} value={property.IdPredio}>
                {property.IdPredio}
              </option>
            ))}

          </select>

        </div>
        <div className="form-group">
          <label htmlFor="nombreCultivo" className="col-form-label">
            Nombre Cultivo:
          </label>
          <select
            htmlFor="nombreCultivo"
            className="form-control"
            id="idCultivo"
            name="idCultivo"
            value={formik.values.idCultivo}
            onChange={formik.handleChange}
          >
              {/* búsqueda en otra colección */}
            <option value="">Seleccione un cultivo</option>
              {crops.map((crop) => (
                <option key={crop.IdCultivo} value={crop.IdCultivo}>
                  {crop.NombreCultivo}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label for="tiempoCultivo" className="col-form-label">
            Tiempo del Cultivo (semana):
          </label>
          <input
            type="text"
            className="form-control"
            id="tiempoCultivo"
            name="tiempoCultivo"
            value={formik.values.tiempoCultivo}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="areaCultivo" className="col-form-label">
            Area Cultivo (hs):
          </label>
          <input
            type="text"
            className="form-control"
            id="areaCultivo"
            name="areaCultivo"
            value={formik.values.areaCultivo}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="cantidadSemillas" className="col-form-label">
            Cantidad de Semillas (hs):
          </label>
          <input
            type="text"
            className="form-control"
            id="cantidadSemillas"
            name="cantidadSemillas"
            value={formik.values.cantidadSemillas}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="cantidadAgua" className="col-form-label">
            Cantidad de Agua m<sup>3</sup>(semana):
          </label>
          <input
            type="text"
            className="form-control"
            id="cantidadAgua"
            name="cantidadAgua"
            value={formik.values.cantidadAgua}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="cantidadFertilizante" className="col-form-label">
            Cantidad de Fertilizante (hs x semana):
          </label>
          <input
            type="text"
            className="form-control"
            id="cantidadFertilizante"
            name="cantidadFertilizante"
            value={formik.values.cantidadFertilizante}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="tiempoRecoleccion" className="col-form-label">
            Tiempo para realizar la recoleccion:
          </label>
          <input
            type="text"
            className="form-control"
            id="tiempoRecoleccion"
            name="tiempoRecoleccion"
            value={formik.values.tiempoRecoleccion}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="kgProyectado" className="col-form-label">
          Kg producto proyectado (hs):
          </label>
          <input
            type="text"
            className="form-control"
            id="kgProyectado"
            name="kgProyectado"
            value={formik.values.kgProyectado}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="tiempoMinimo" className="col-form-label">
          Tiempo de espera Mínimo próxima siembra(semana):
          </label>
          <input
            type="text"
            className="form-control"
            id="tiempoMinimo"
            name="tiempoMinimo"
            value={formik.values.tiempoMinimo}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaSiembra" className="col-form-label">
            Fecha de la Siembra:
          </label>
          <input
            type="date"
            className="form-control"
            id="fechaSiembra"
            name="fechaSiembra"
            value={formik.values.fechaSiembra}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaCosecha" className="col-form-label">
            Fecha de la Cosecha:
          </label>
          <input
            type="date"
            className="form-control"
            id="fechaCosecha"
            name="fechaCosecha"
            value={formik.values.fechaCosecha}
            onChange={formik.handleChange}
          />
        </div>
        
        <div className="mt-4">
        <Button className="me-3" variant="secondary" onClick={()=>setModal(false)}>
          Cerrar
        </Button>
        <Button variant ="success" as = 'input' type = "submit" value = "Guardar" />
        </div>
      </form>
    </MainModal>
  );
};

export default ConfigModal;