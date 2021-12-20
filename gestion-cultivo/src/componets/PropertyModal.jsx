import React from "react";
import MainModal from "./MainModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { updateProperty,createProperty,getUsers } from "../services/api";

const PropertyModal = ({ modal, setModal, modalType,updatePropertys,property}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = React.useState([]);
  const formik = useFormik({
    initialValues: {
      idPredio: property?property.idPredio:"",
      idPropietario: property?property.idPropietario:"",
      cantidadHectareas: property?property.cantidadHectareas:"", 
      ubicacion: property?property.ubicacion:"",
      longitudLatitud: property?property.longitudLatitud:"", 
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
      console.log('e')
      if(modalType === "create"){
        await createProperty(data)
          .then((res) => {
            if (res.status === 201) {
              enqueueSnackbar('¡Bien hecho! Predio creado exitosamente', { variant:'success'});
              updatePropertys();
              setModal(false);
            }else{
              enqueueSnackbar('¡Error! El Predio no pudo ser creado', { variant:'error'});
            }
            resetForm();
          })
          .catch((err) => {
            enqueueSnackbar(err.response.data.message, {
              variant: "error",
            });
          });
      }else{
        await updateProperty(property.id,data)
          .then((res) => {
            enqueueSnackbar("Usuario actualizado con éxito", {
              variant: "success",
            });
            updatePropertys();
            resetForm();
            setModal(false);
            console.log(modal)
          })
          .catch((err) => {
            console.log(err)
            enqueueSnackbar(err.response.data.message, {
              variant: "error",
            });
          });
      }   
    }
  });
  const traerUsuario = async () => {
    await getUsers()
      .then((res) => {
        setUsers(res);
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
        idPredio: property.idPredio,
        idPropietario: property.idPropietario,
        cantidadHectareas: property.cantidadHectareas,
        ubicacion: property.ubicacion,
        longitudLatitud: property.longitudLatitud,
      });
    }
    traerUsuario();
  }, [modalType, property]);

  return (
    <MainModal
      show={modal}
      setShow={setModal}
      title={
        modalType === "create"
          ? "Creación de Predio"
          : "Actualización de Predio"
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
          <select
            for="idPropietario"
            className="form-control"
            id="idPropietario"
            name="idPropietario"
            value={formik.values.idPropietario}
            onChange={formik.handleChange}
          >
          {users.map((user) => (
                <option key={user.Identificacion} value={user.Identificacion}>
                  {user.Identificacion}
                </option>
            ))}
          </select>
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

