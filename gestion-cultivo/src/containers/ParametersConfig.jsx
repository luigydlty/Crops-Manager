import React from "react";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import { useState, useEffect } from "react";
import MainContentHeader from "../componets/MainContentHeader";
import { useSnackbar } from "notistack";
import ParameterModal from "../componets/ParameterModal";
import ParameterTable from "../componets/ParameterTable";
import { getParameters,getCrops} from "../services/api";

const ParametersConfig = () => {
    const [modal, setModal] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [modalUpdate, setModalUpdate] = useState(false);
    const [parameters,setParameters] = useState([]);
    const [crops, setCrops] = React.useState([]);
    /* Función para obtener los usuarios */
    const obtenerParametro = async () => {
      const response = await getParameters();
      console.log(response);
      setParameters(response);
  }

  const traerCultivo = async () => {
    await getCrops()
      .then((res) => {
        setCrops(res);
        console.log(res);
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
        });
      });
  };

  /* Cargar datos en tabla con hook useEffect */
  useEffect(() => {
      obtenerParametro();
      traerCultivo();
  }, [])
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar viewType={'admin'} />
        <Header />
        <main
          className="col-lg-10 mt-lg-5  p-lg-0"
          style={{ marginLeft: "16.7%" }}
        >
          <div className="m-lg-3 mt-lg-3 ">
            <div className="card">
              <div className="card-body">
                <MainContentHeader
                 setModal={setModal}
                 title={"Parametrizar Cultivo"}
                 subTitle={"Listado de Parametros"}
                 buttonTitle={"Crear Parametro"}
                 /> 
                <ParameterTable setModal={setModal} setModalUpdate={setModalUpdate} parameters={parameters}
                  obtenerParametro={obtenerParametro} crops={crops}/>
              </div>
            </div>
          </div>
        </main>
        <ParameterModal modal={modal} modalType={'create'} updateParameters={obtenerParametro} setModal={setModal}/> 
      </div>
    </div>
  );
};

export default ParametersConfig;
