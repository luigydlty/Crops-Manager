import React from "react";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import { useState, useEffect } from "react";
import MainContentHeader from "../componets/MainContentHeader";
import PropertyModal from "../componets/PropertyModal";
import PropertyTable from "../componets/PropertyTable";
import { getProperty } from "../services/api";

const PropertyAdmin = () => {
  const [modal, setModal] = useState(false);
  const [setModalUpdate] = useState(false);
  const [propertys, setPropertys] = useState([]);

  /* Función para obtener los predios */
  const obtenerPredios = async () => {
    const response = await getProperty();
    setPropertys(response);
  };
  /* Cargar datos en tabla con hook useEffect */
  useEffect(() => {
    obtenerPredios();
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
                  title={"Gestión de Predios"}
                  subTitle={"Listado de Predios"}
                  buttonTitle={"Agregar Predio"}
                />
                <PropertyTable
                  setModal={setModal}
                  setModalUpdate={setModalUpdate}
                  propertys={propertys}
                  obtenerPredio={obtenerPredios}
                />
              </div>
            </div>
          </div>
        </main>
        <PropertyModal
          modal={modal}
          modalType={"create"}
          setModal={setModal}
          updatePropertys={obtenerPredios}
        />
        {/* <PropertyModal modal={modalUpdate} modalType={'update'} setModal={setModalUpdate}/>  */}
      </div>
    </div>
  );
};

export default PropertyAdmin;
