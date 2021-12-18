import React from "react";
import MainModal from "./MainModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { useSnackbar } from "notistack";

const ConfigModal = ({ modal, setModal, modalType,updateConfig}) => {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
        idPredio: "",
        idCultivo: "",
        tiempoEnCultivo: "",
        areaCultivo: "" ,
        cantidadSemillasHect: "",
        cantidadAgua: "",
        cantidadFertilizante: "",
        tiempoEnRecoleccion: "",
        kgProyectado: "",
        tiempoMinimo: "",
        fechaSiembra: "",
        fechaCosecha: "",
    },
    validationSchema: Yup.object({
        idPredio: Yup.string().required("El campo es requerido"),
        idCultivo: Yup.string().required("El campo es requerido"),
        tiempoEnCultivo: Yup.string().required("El campo es requerido"),
        areaCultivo: Yup.string().required("El campo es requerido"),
        cantidadSemillasHect: Yup.string().required("El campo es requerido"),
        cantidadAgua: Yup.string().required("El campo es requerido"),
        cantidadFertilizante: Yup.string().required("El campo es requerido"),
        tiempoEnRecoleccion: Yup.string().required("El campo es requerido"),
        kgProyectado: Yup.string().required("El campo es requerido"),
        tiempoMinimo: Yup.string().required("El campo es requerido"),
        fechaSiembra: Yup.string().required("El campo es requerido"),
        fechaCosecha: Yup.string().required("El campo es requerido"),
    }),
    onSubmit: async (values,{resetForm}) => {
      const data = {
        idPredio: values.idPredio,
        idCultivo: values.idCultivo,
        tiempoEnCultivo: values.tiempoEnCultivo,
        areaCultivo: values.areaCultivo,
        cantidadSemillasHect: values.cantidadSemillasHect,
        cantidadAgua: values.cantidadAgua,
        cantidadFertilizante: values.cantidadFertilizante,
        tiempoEnRecoleccion: values.tiempoEnRecoleccion,
        kgProyectado: values.kgProyectado,
        tiempoMinimo: values.tiempoMinimo,
        fechaSiembra: values.fechaSiembra,
        fechaCosecha: values.fechaCosecha,
      };
      try {
        await fetch("http://localhost:8081/configs/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => { 
            if (res.status === 200) {
              enqueueSnackbar('¡Bien hecho! Configuración creada exitosamente', { variant:'success'});
              updateConfig();
              setModal(false);
            }else{
              enqueueSnackbar('¡Error! La configuración no pudo ser creada', { variant:'error'});
            }
            } 
          )
      } catch (error) {
        enqueueSnackbar('¡Error! No se pudo crear la configuración', { variant:'error'});
      }
      resetForm();
    },
  });

  return (
    <MainModal
      show={modal}
      setShow={setModal}
      title={
        modalType === "create"
          ? "Creación de configuración"
          : "Actualización de configuración"
      }
    >
      <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
          <label for="idPredio" className="col-form-label">
            ID Predio:
          </label>
          <input
            type="text"
            className="form-control"
            id="idPredio"
            name="idPredio"
            value={formik.values.idPredio}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="idCultivo" className="col-form-label">
            ID Cultivo:
          </label>
          <input
            type="text"
            className="form-control"
            id="idCultivo"
            name="idCultivo"
            value={formik.values.idCultivo}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="tiempoEnCultivo" className="col-form-label">
            Tiempo del Cultivo (semana):
          </label>
          <input
            type="text"
            className="form-control"
            id="tiempoEnCultivo"
            name="tiempoEnCultivo"
            value={formik.values.tiempoEnCultivo}
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
          <label for="cantidadSemillasHect" className="col-form-label">
            Cantidad de Semillas (hs):
          </label>
          <input
            type="text"
            className="form-control"
            id="cantidadSemillasHect"
            name="cantidadSemillasHect"
            value={formik.values.cantidadSemillasHect}
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
          <label for="tiempoEnRecoleccion" className="col-form-label">
            Tiempo para realizar la recoleccion:
          </label>
          <input
            type="text"
            className="form-control"
            id="tiempoEnRecoleccion"
            name="tiempoEnRecoleccion"
            value={formik.values.tiempoEnRecoleccion}
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
          <label for="fechaSiembra" className="col-form-label">
            Fecha de la Siembra:
          </label>
          <input
            type="text"
            className="form-control"
            id="fechaSiembra"
            name="fechaSiembra"
            value={formik.values.fechaSiembra}
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