import React from "react";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import { useState, useEffect } from "react";
import MainContentHeader from "../componets/MainContentHeader";
import ParameterModal from "../componets/ParameterModal";
import ParameterTable from "../componets/ParameterTable";
import { getParameters } from "../services/api";

const ParametersAdmin = () => {
    const [modal, setModal] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [parameters,setParameters] = useState([]);
    /* Función para obtener los usuarios */
    const obtenerParametro = async () => {
      const response = await getParameters();
      console.log(response);
      setParameters(response);
  }
  /* Cargar datos en tabla con hook useEffect */
  useEffect(() => {
      obtenerParametro();
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
                 buttonTitle={"Agregar Parametro"}
                 /> 
                <ParameterTable setModal={setModal} setModalUpdate={setModalUpdate} parameters={parameters}
                  obtenerParametro={obtenerParametro}/>
              </div>
            </div>
          </div>
        </main>
        <ParameterModal modal={modal} modalType={'create'} updateParameters={obtenerParametro} setModal={setModal}/> 
      </div>
    </div>
  );
};

export default ParametersAdmin;
