import React from "react";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import { useState,useEffect } from "react";
import DataTable from "../componets/UserTable";
import MainContentHeader from "../componets/MainContentHeader";
import UserModal from "../componets/UserModal";
import { getUsers } from "../services/api";

const UserAdmin = () => {
  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [users,setUsers] = useState([]);
    /* Función para obtener los usuarios */
    const obtenerUsuario = async () => {
      const response = await getUsers();
      setUsers(response);
  }
  /* Cargar datos en tabla con hook useEffect */
  useEffect(() => {
      obtenerUsuario();
  }, [])



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
                  title={"Gestión Usuario"}
                  subTitle={"Listado de usuarios"}
                  buttonTitle={"Crear Usurio"}
                />
                <DataTable
                  setModal={setModal}
                  setModalUpdate={setModalUpdate}
                  users={users}
                  obtenerUsuario={obtenerUsuario}
                />
              </div>
            </div>
          </div>
        </main>
        <UserModal modal={modal} modalType={"create"} setModal={setModal} updateUsers={obtenerUsuario} />
        {/* <UserModal
          modal={modalUpdate}
          modalType={"update"}
          setModal={setModalUpdate}
          updateUsers={obtenerUsuario}
        /> */}
      </div>
    </div>
  );
};

export default UserAdmin;
