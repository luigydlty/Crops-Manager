import React from "react";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import { useState } from "react";
import MainContentHeader from "../componets/MainContentHeader";
import ParameterModal from "../componets/ParameterModal";
import ParameterTable from "../componets/ParameterTable";

const ParametersAdmin = () => {
    const [modal, setModal] = useState(false);
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
                 title={"Parametrizar Cultivo"}
                 subTitle={"Listado de Parametros"}
                 buttonTitle={"Agregar Parametro"}
                 /> 
                <ParameterTable setModal={setModal} setModalUpdate={setModalUpdate}/>
              </div>
            </div>
          </div>
        </main>
        <ParameterModal modal={modal} modalType={'create'} setModal={setModal}/> 
        <ParameterModal modal={modalUpdate} modalType={'update'} setModal={setModalUpdate}/> 
      </div>
    </div>
  );
};

export default ParametersAdmin;

