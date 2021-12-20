import React from "react";
import MainModal from "./MainModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { updateParameter,createParameter,getCrops } from "../services/api";

const ParameterModal = ({ modal, setModal, modalType,updateParameters, parameter}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [crops, setCrops] = React.useState([]);
  const formik = useFormik({
    initialValues: {
      idCultivo: "",
      valorSemilla: "",
      valorAgua: "",
      valorFertilizante: "",
    },
    validationSchema: Yup.object({
      idCultivo: Yup.string().required("El campo es requerido"),
      valorSemilla: Yup.string().required("El campo es requerido"),
      valorAgua: Yup.string().required("El campo es requerido"),
      valorFertilizante: Yup.string().required("El campo es requerido"),
    }),
    onSubmit: async (values,{resetForm}) => {
      const data = {
        idCultivo: values.idCultivo,
        valorSemilla: values.valorSemilla,
        valorAgua: values.valorAgua,
        valorFertilizante: values.valorFertilizante,
      };
      console.log('e')
      if(modalType === "create"){
        await createParameter(data)
          .then((res) => {
            if (res.status === 201) {
              enqueueSnackbar('¡Bien hecho! Parámetro creado exitosamente', { variant:'success'});
              updateParameters();
              setModal(false);
            }else{
              enqueueSnackbar('¡Error! El parámetro no pudo ser creado', { variant:'error'});
            }
            resetForm();
          })
          .catch((err) => {
            enqueueSnackbar(err.response.data.message, {
              variant: "error",
            });
          });
      }else{
        await updateParameter(parameter.id,data)
          .then((res) => {
            enqueueSnackbar("Parámetro actualizado con éxito", {
              variant: "success",
            });
            updateParameters();
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
        idCultivo: parameter.idCultivo || "",
        valorSemilla: parameter.valorSemilla || "",
        valorAgua: parameter.valorAgua || "",
        valorFertilizante: parameter.valorFertilizante || "",
      });
    }
    traerCultivo();
  }, [modalType, parameter]);

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
          <label for="idCultivo" className="col-form-label">
            Cultivo:
          </label>
          <select
            for="idCultivo"
            className="form-control"
            id="idCultivo"
            name="idCultivo"
            value={formik.values.idCultivo}
            onChange={formik.handleChange}
          >
            {crops.map((crop) => (
                <option key={crop.IdCultivo} value={crop.NombreCultivo}>
                  {crop.NombreCultivo}
                </option>
            ))}
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
          <label for="valorAgua" className="col-form-label">
            Valor m<sup>3</sup> de Agua:
          </label>
          <input
            type="text"
            className="form-control"
            id="valorAgua"
            name="valorAgua"
            value={formik.values.valorAgua}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="valorFertilizante" className="col-form-label">
            Valor Kg de Fertilizante:
          </label>
          <input
            type="text"
            className="form-control"
            id="valorFertilizante"
            name="valorFertilizante"
            value={formik.values.valorFertilizante}
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