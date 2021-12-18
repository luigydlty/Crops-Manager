import React from "react";
import MainModal from "./MainModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { useSnackbar } from "notistack";

const CropsModal = ({ modal, setModal, modalType,updateUsers}) => {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      /* identificacion: "", */
      nombreCultivo: "",
      descripcion: "",
/*       rol: "",
      correo: "",
      contrasena: "", */
    },
    validationSchema: Yup.object({
      nombreCultivo: Yup.string().required("El campo es requerido"),
      descripcion: Yup.string().required("El campo es requerido"),
      /* apellidos: Yup.string().required("El campo es requerido"),
      rol: Yup.string().required("El campo es requerido"),
      correo: Yup.string().required("El campo es requerido"),
      contrasena: Yup.string().required("El campo es requerido"), */
    }),
    onSubmit: async (values,{resetForm}) => {
      const data = {
        nombreCultivo: values.nombreCultivo,
        descripcion: values.descripcion,
/*         apellidos: values.apellidos,
        rol: values.rol,
        correo: values.correo,
        contrasena: values.contrasena, */
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
          ? "Creación de Cultivo"
          : "Actualización de Cultivo"
      }
    >
      <form onSubmit={formik.handleSubmit}>
{/*         {modalType === "create" ? (
          <div className="form-group">
            <label for="recipient-name" className="col-form-label">
              No Identificación:
            </label>
            <input
              type="text"
              className="form-control"
              id="identificacion"
              name="identificacion"
              value={formik.values.identificacion}
              onChange={formik.handleChange}
            />
          </div>
        ) : null} */}

{/*         <div className="form-group">
          <label for="name" className="col-form-label">
            Nombres:
          </label>
          <input
            type="text"
            className="form-control"
            id="nombres"
            name="nombres"
            value={formik.values.nombres}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="last-name" className="col-form-label">
            Apellidos:
          </label>
          <input
            type="text"
            className="form-control"
            id="apellidos"
            name="apellidos"
            value={formik.values.apellidos}
            onChange={formik.handleChange}
          />
        </div> */}
        <div className="form-group">
          <label for="nombreCultivo" className="col-form-label">
            Nombre Cultivo:
          </label>
          <select
            for="nombreCultivo"
            className="form-control"
            id="nombreCultivo"
            name="nombreCultivo"
            value={formik.values.nombreCultivo}
            onChange={formik.handleChange}
          >
            <option>Seleccione una opción</option>
            <option value={"miniClavel"}>Mini Clavel</option>
            <option value={"clavelStandar"}>Clavel Standar</option>
          </select>
        </div>
        <div className="form-group">
          <label for="descripcion" className="col-form-label">
            Descripción:
          </label>
          <input
            type="text"
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={formik.values.descripcion}
            onChange={formik.handleChange}
          />
        </div>

        {/* {modalType === "create" ? (
          <div className="form-group">
            <label for="password" className="col-form-label">
              Contraseña:
            </label>
            <input
              type="password"
              className="form-control"
              id="contrasena"
              name="contrasena"
              value={formik.values.contrasena}
              onChange={formik.handleChange}
            />
          </div>
        ) : null} */}
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

export default CropsModal;
