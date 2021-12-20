import React from "react";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import { useState, useEffect } from "react";
import MainContentHeader from "../componets/MainContentHeader";
import ConfigModalManage from "../componets/ConfigModalManage";
import ConfigTableManage from "../componets/ConfigTableManage";
import ViewModalManage from "../componets/ViewModalManage";
import { getConfigs } from "../services/api";

const ConfigAdminManage = () => {
  const [modal, setModal] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [configs, setConfigs] = useState([]);
  const obtenerConfiguracion = async () => {
    const response = await getConfigs();
    setConfigs(response);
  };
  /* Cargar datos en tabla con hook useEffect */
  useEffect(() => {
    obtenerConfiguracion();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar viewType={"admin"} />
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
                  title={"Configuración de Cultivos"}
                  subTitle={"Listado de Configuraciones"}
                  buttonTitle={"Configurar Cultivo"}
                />
                <ConfigTableManage
                  setModal={setModal}
                  setModalUpdate={setModalUpdate}
                  configs={configs}
                  obtenerConfiguracion={obtenerConfiguracion}
                />
              </div>
            </div>
          </div>
        </main>
        <ViewModalManage
          modalView={modalView}
          modalType={"view"}
          setModalView={setModalView}
        />
        <ConfigModalManage
          modal={modal}
          modalType={"create"}
          setModal={setModal}
          updateConfigs={obtenerConfiguracion}
        />
        {/* <ConfigModal modal={modalUpdate} modalType={'update'} setModal={setModalUpdate}/>  */}
      </div>
    </div>
  );
};

export default ConfigAdminManage;