import React from "react";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import { useState } from "react";
import MainContentHeader from "../componets/MainContentHeader";
import PropertyModal from "../componets/PropertyModal";
import PickTable from "../componets/PickTable";

const PickAdmin = () => {
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
                 title={"Gestión de Predios"}
                 subTitle={"Listado de Predios"}
                 buttonTitle={"Agregar Predio"}
                 /> 
                <PickTable setModal={setModal} setModalUpdate={setModalUpdate}/>
              </div>
            </div>
          </div>
        </main>
        <PropertyModal modal={modal} modalType={'create'} setModal={setModal}/> 
        <PropertyModal modal={modalUpdate} modalType={'update'} setModal={setModalUpdate}/> 
      </div>
    </div>
  );
};

export default PickAdmin;