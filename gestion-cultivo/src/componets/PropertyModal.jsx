import React from "react";
import MainModal from "./MainModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { useSnackbar } from "notistack";

const PropertyModal = ({ modal, setModal, modalType,updateUsers}) => {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      idPredio: "",
      idPropietario: "",
      cantidadHectareas: "",
      ubicacion: "",
      longitudLatitud: "",
    },
    validationSchema: Yup.object({
      idPredio: Yup.string().required("El campo es requerido"),
      idPropietario: Yup.string().required("El campo es requerido"),
      cantidadHectareas: Yup.string().required("El campo es requerido"),
      ubicacion: Yup.string().required("El campo es requerido"),
      longitudLatitud: Yup.string().required("El campo es requerido"),
      
    }),
    onSubmit: async (values,{resetForm}) => {
      const data = {
          idPredio: values.idPredio,
          idPropietario: values.idPropietario,
          cantidadHectareas: values.cantidadHectareas,
          ubicacion: values.ubicacion,
          longitudLatitud: values.longitudLatitud,
      };
      try {
        await fetch("http://localhost:8081/crops/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => { 
            if (res.status === 200) {
              enqueueSnackbar('¡Bien hecho! Cultivo creado exitosamente', { variant:'success'});
              updateUsers();
              setModal(false);
            }else{
              enqueueSnackbar('¡Error! El cultivo no pudo ser creado', { variant:'error'});
            }
            } 
          )
      } catch (error) {
        enqueueSnackbar('¡Error! No se pudo crear el cultivo', { variant:'error'});
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
          ? "Creación de Propiedad"
          : "Actualización de Propiedad"
      }
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label for="idPredio" className="col-form-label">
            Id Predio:
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
          <label for="idPropietario" className="col-form-label">
            Id Propietario:
          </label>
          <input
            type="text"
            className="form-control"
            id="idPropietario"
            name="idPropietario"
            value={formik.values.idPropietario}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="cantidadHectareas" className="col-form-label">
            Cantidad Hectareas:
          </label>
          <input
            type="text"
            className="form-control"
            id="cantidadHectareas"
            name="cantidadHectareas"
            value={formik.values.cantidadHectareas}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="ubicacion" className="col-form-label">
            Ubicación:
          </label>
          <input
            type="text"
            className="form-control"
            id="ubicacion"
            name="ubicacion"
            value={formik.values.ubicacion}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="longitudLatitud" className="col-form-label">
            Latitud y longitud:
          </label>
          <input
            type="text"
            className="form-control"
            id="longitudLatitud"
            name="longitudLatitud"
            value={formik.values.longitudLatitud}
            onChange={formik.handleChange}
          />
        </div>
        
        <div className="mt-4">
        <Button className="me-3" variant="secondary" onClick={()=>setModal(false)}>
          Cerrar
        </Button>
        <Button variant ="success" as = 'input' type = "submit" value = "Enviar" />
        </div>
      </form>
    </MainModal>
  );
};

export default PropertyModal;

