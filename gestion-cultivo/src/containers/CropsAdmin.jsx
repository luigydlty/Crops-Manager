import React from "react";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import { useState,useEffect } from "react";
import MainContentHeader from "../componets/MainContentHeader";
import CropsModal from "../componets/CropsModal";
import CropsTable from "../componets/CropsTable";
import { getCrops } from "../services/api";

const CropsAdmin = () => {
    const [modal, setModal] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [crops,setCrops] = useState([]);
      /* Función para obtener los usuarios */
      const obtenerCultivo = async () => {
        const response = await getCrops();
        setCrops(response);
    }
    /* Cargar datos en tabla con hook useEffect */
    useEffect(() => {
        obtenerCultivo();
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
                 title={"Gestión de Cultivos"}
                 subTitle={"Listado de Cultivos"}
                 buttonTitle={"Crear Cultivo"}
                 /> 
                <CropsTable setModal={setModal} setModalUpdate={setModalUpdate} crops={crops} obtenerCultivo={obtenerCultivo}/>
              </div>
            </div>
          </div>
        </main>
        <CropsModal modal={modal} modalType={'create'} setModal={setModal} updateCrops={obtenerCultivo}/> 
        {/* <CropsModal modal={modalUpdate} modalType={'update'} setModal={setModalUpdate}/>  */}
      </div>
    </div>
  );
};

export default CropsAdmin;