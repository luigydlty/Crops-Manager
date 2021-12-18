import React from "react";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import { useState } from "react";
import MainContentHeader from "../componets/MainContentHeader";
import ConfigModal from "../componets/ConfigModal";
import ConfigTable from "../componets/ConfigTable";
import ViewModal from "../componets/ViewModal";

const ConfigAdmin = () => {
    const [modal, setModal] = useState(false);
    const [modalView, setModalView] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
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
                 title={"Configuración de Cultivos"}
                 subTitle={"Listado de Configuraciones"}
                 buttonTitle={"Configurar Cultivo"}
                 /> 
                <ConfigTable setModal={setModal} setModalUpdate={setModalUpdate} setModalView={setModalView}/>
              </div>
            </div>
          </div>
        </main>
        <ViewModal modalView={modalView} modalType={'view'} setModalView={setModalView}/>
        <ConfigModal modal={modal} modalType={'create'} setModal={setModal}/> 
        <ConfigModal modal={modalUpdate} modalType={'update'} setModal={setModalUpdate}/> 
      </div>
    </div>
  );
};

export default ConfigAdmin;