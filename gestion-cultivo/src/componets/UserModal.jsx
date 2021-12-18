import React from "react";
import MainModal from "./MainModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { updateUser,createUser } from "../services/api";

const UserModal = ({ modal, setModal, modalType,updateUsers,user}) => {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      identificacion: "",
      nombres: user?user.nombres:"",
      apellidos: user?user.apellidos:"",
      rol: user?user.rol:"",
      correo: user?user.correo:"",
      contrasena: "",
    },
    validationSchema: Yup.object({
      identificacion: Yup.string().required("El campo es requerido"),
      nombres: Yup.string().required("El campo es requerido"),
      apellidos: Yup.string().required("El campo es requerido"),
      rol: Yup.string().required("El campo es requerido"),
      correo: Yup.string().required("El campo es requerido"),
      contrasena: Yup.string().required("El campo es requerido").min(8, "La contraseña debe tener al menos 8 caracteres"),
    }),
    onSubmit: async (values,{resetForm}) => {
      const data = {
        identificacion: values.identificacion,
        nombres: values.nombres,
        apellidos: values.apellidos,
        rol: values.rol,
        correo: values.correo,
        contrasena: values.contrasena,
      };
      console.log('e')
      if(modalType === "create"){
        await createUser(data)
          .then((res) => {
            if (res.status === 201) {
              enqueueSnackbar('¡Bien hecho! Usuario creado exitosamente', { variant:'success'});
              updateUsers();
              setModal(false);
            }else{
              enqueueSnackbar('¡Error! El usuario no pudo ser creado', { variant:'error'});
            }
            resetForm();
          })
          .catch((err) => {
            enqueueSnackbar(err.response.data.message, {
              variant: "error",
            });
          });
      }else{
        await updateUser(user.id,data)
          .then((res) => {
            enqueueSnackbar("Usuario actualizado con éxito", {
              variant: "success",
            });
            updateUsers();
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


/*       try {
        await fetch("http://localhost:8081/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => { 
            if (res.status === 200) {
              enqueueSnackbar('¡Bien hecho! Usuario creado exitosamente', { variant:'success'});
              updateUsers();
              setModal(false);
            }else{
              enqueueSnackbar('¡Error! El usuario no pudo ser creado', { variant:'error'});
            }
            } 
          )
      } catch (error) {
        enqueueSnackbar('¡Error! No se pudo crear el usuario', { variant:'error'});
      }
      resetForm();
    },
  }); */

  useEffect(() => {
    if (modalType === "update") {
      formik.setValues({
        identificacion:"123", 
        nombres: user.nombres || "",
        apellidos: user.apellidos || "",
        rol: user.rol || "",
        correo: user.correo || "" ,
        contrasena:'12345678',
      });
    }
  }, [modalType, user]);

  return (
    <MainModal
      show={modal}
      setShow={setModal}
      title={
        modalType === "create"
          ? "Creación de Usuario"
          : "Actualización de Usuario"
      }
    >
      <form onSubmit={formik.handleSubmit}>
        {modalType === "create" ? (
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
            {console.log(formik.values)}
          </div>
        ) : null}

        <div className="form-group">
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
        </div>
        <div className="form-group">
          <label for="rol" className="col-form-label">
            Rol:
          </label>
          <select
            for="rol"
            className="form-control"
            id="rol"
            name="rol"
            value={formik.values.rol}
            onChange={formik.handleChange}
          >
            <option>Seleccione una opción</option>
            <option value={"configuracion"}>Configuración</option>
            <option value={"gestion"}>Gestión</option>
            <option value={"administrador"}>Administrador</option>
          </select>
        </div>
        <div className="form-group">
          <label for="mail" className="col-form-label">
            E-mail:
          </label>
          <input
            type="mail"
            className="form-control"
            id="correo"
            name="correo"
            value={formik.values.correo}
            onChange={formik.handleChange}
          />
        </div>

        {modalType === "create" ? (
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
        ) : null}
        <div className="mt-3">
        <Button className="me-3" variant="secondary" onClick={()=>setModal(false)}>
          Cerrar
        </Button>
        <Button variant ="success" as = 'input' type = "submit" value = "Guardar" />
        </div>
      </form>
    </MainModal>
  );
};

export default UserModal;
