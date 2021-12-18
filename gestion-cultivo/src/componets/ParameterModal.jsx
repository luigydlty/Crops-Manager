import React from "react";
import MainModal from "./MainModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { useSnackbar } from "notistack";

const ParameterModal = ({ modal, setModal, modalType,updateUsers}) => {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      Cultivo: "",
      valorSemilla: "",
      valorMAgua: "",
      valorKGFertilizante: "",
    },
    validationSchema: Yup.object({
      Cultivo: Yup.string().required("El campo es requerido"),
      valorSemilla: Yup.string().required("El campo es requerido"),
      valorMAgua: Yup.string().required("El campo es requerido"),
      valorKGFertilizante: Yup.string().required("El campo es requerido"),
    }),
    onSubmit: async (values,{resetForm}) => {
      const data = {
        Cultivo: values.Cultivo,
        valorSemilla: values.valorSemilla,
        valorMAgua: values.valorMAgua,
        valorKGFertilizante: values.valorKGFertilizante,
      };
      try {
        await fetch("http://localhost:8081/parameters/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => { 
            if (res.status === 200) {
              enqueueSnackbar('¡Bien hecho! Parámetros creados exitosamente', { variant:'success'});
              updateUsers();
              setModal(false);
            }else{
              enqueueSnackbar('¡Error! Los parámetros no pudieron ser creados', { variant:'error'});
            }
            } 
          )
      } catch (error) {
        enqueueSnackbar('¡Error! No se pudo crear los parámetros', { variant:'error'});
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
          ? "Creación de Parámetros"
          : "Actualización de Parámetros"
      }
    >
      <form onSubmit={formik.handleSubmit}>

        <div className="form-group">
          <label for="Cultivo" className="col-form-label">
            Cultivo:
          </label>
          <select
            for="Cultivo"
            className="form-control"
            id="Cultivo"
            name="Cultivo"
            value={formik.values.Cultivo}
            onChange={formik.handleChange}
          >
              {/* búsqueda en otra colección */}
            <option>Seleccione una opción</option>
            <option value={"miniClavel"}>Mini Clavel</option>
            <option value={"clavelStandar"}>Clavel Estándar</option>
          </select>
        </div>
        <div className="form-group">
          <label for="valorSemilla" className="col-form-label">
            Valor de la Semilla:
          </label>
          <input
            type="text"
            className="form-control"
            id="valorSemilla"
            name="valorSemilla"
            value={formik.values.valorSemilla}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="valorMAgua" className="col-form-label">
            Valor m<sup>3</sup> de Agua:
          </label>
          <input
            type="text"
            className="form-control"
            id="valorMAgua"
            name="valorMAgua"
            value={formik.values.valorMAgua}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="valorKGFertilizante" className="col-form-label">
            Valor Kg de Fertilizante:
          </label>
          <input
            type="text"
            className="form-control"
            id="valorKGFertilizante"
            name="valorKGFertilizante"
            value={formik.values.valorKGFertilizante}
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

export default ParameterModal;