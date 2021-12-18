import React from "react";
import MainModal from "./MainModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { updateCrop,createCrop } from "../services/api";

const CropsModal = ({ modal, setModal, modalType, updateCrops, crop}) => {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      /* identificacion: "", */
      // id: crop?crop.id: "",
      idCultivo: crop?crop.idCultivo:"",
      nombreCultivo: crop?crop.nombreCultivo:"",
      descripcion: crop?crop.descripcion:"",
/*       rol: "",
      correo: "",
      contrasena: "", */
    },
    validationSchema: Yup.object({
      idCultivo: Yup.string().required("El campo es requerido"),
      nombreCultivo: Yup.string().required("El campo es requerido"),
      descripcion: Yup.string().required("El campo es requerido"),
      /* apellidos: Yup.string().required("El campo es requerido"),
      rol: Yup.string().required("El campo es requerido"),
      correo: Yup.string().required("El campo es requerido"),
      contrasena: Yup.string().required("El campo es requerido"), */
    }),
    onSubmit: async (values,{resetForm}) => {
      const data = {
        idCultivo: values.idCultivo,
        nombreCultivo: values.nombreCultivo,
        descripcion: values.descripcion,
/*         apellidos: values.apellidos,
        rol: values.rol,
        correo: values.correo,
        contrasena: values.contrasena, */
      };
      console.log('e')
      if(modalType === "create"){
        await createCrop(data)
          .then((res) => {
            if (res.status === 201) {
              enqueueSnackbar('¡Bien hecho! Cultivo creado exitosamente', { variant:'success'});
              updateCrops();
              setModal(false);
            }else{
              enqueueSnackbar('¡Error! El cultivo no pudo ser creado', { variant:'error'});
            }
            resetForm();
          })
          .catch((err) => {
            enqueueSnackbar(err.response.data.message, {
              variant: "error",
            });
          });
      }else{
        await updateCrop(crop.id,data)
          .then((res) => {
            enqueueSnackbar("Cultivo actualizado con éxito", {
              variant: "success",
            });
            updateCrops();
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

  //     try {
  //       await fetch("http://localhost:8081/crops/add", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       })
  //         .then((res) => { 
  //           if (res.status === 200) {
  //             enqueueSnackbar('¡Bien hecho! Cultivo creado exitosamente', { variant:'success'});
  //             updateUsers();
  //             setModal(false);
  //           }else{
  //             enqueueSnackbar('¡Error! El cultivo no pudo ser creado', { variant:'error'});
  //           }
  //           } 
  //         )
  //     } catch (error) {
  //       enqueueSnackbar('¡Error! No se pudo crear el cultivo', { variant:'error'});
  //     }
  //     resetForm();
  //   },
  // });

  useEffect(() => {
    if (modalType === "update") {
      formik.setValues({
        idCultivo: crop.idCultivo || "",
        nombreCultivo: crop.nombreCultivo || "",
        descripcion: crop.descripcion || "",
        // identificacion:"123", 
        // nombres: user.nombres || "",
        // apellidos: user.apellidos || "",
        // rol: user.rol || "",
        // correo: user.correo || "" ,
        // contrasena:'12345678',
      });
    }
  }, [modalType, crop]);


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
      <div className="form-group">
          <label htmlFor="idCultivo" className="col-form-label">
            Id Cultivo:
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
        <label htmlFor="idCultivo" className="col-form-label">
            Nombre Cultivo:
          </label>
          <input
            type="text"
            className="form-control"
            id="nombreCultivo"
            name="nombreCultivo"
            value={formik.values.nombreCultivo}
            onChange={formik.handleChange}
          />
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
