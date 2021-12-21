import React from "react";
import logo from "../assets/img/logo.svg";
import { useNavigate, Link } from "react-router-dom";

const Sidebar = ({}) => {
  const navigate = useNavigate();
  const rolUser = localStorage.getItem('rol');
  const handleClick = (e, route) => {
    e.preventDefault();
    if (rolUser === "administrador") {
      navigate("/homeAdmin");
    } else if (rolUser === "configuracion") {
      navigate("/homeConfig");
    } else if (rolUser === "gestion") {
      navigate("/homeManage");
    }
  };
  return (
    <nav className="col-lg-2 navBar bg-green vh-100 position-fixed p-lg-3">
      <img
        src={logo}
        alt="logo"
        className="img-fluid mx-auto d-block w-75 mt-lg-2 mb-lg-4"
      />
      <hr className="border border-white" />
      <ul className="nav flex-column">
        <li className="nav-item ">
          <a href="/" className="active" onClick={(e) => handleClick(e)}>
            <i className="fas fa-home"></i>
            Inicio
          </a>
        </li>
        {rolUser === "administrador" && (
          <>
            {" "}
            <li className="nav-item">
              <Link className="navLink" to="/userAdmin">
                <i className="fas fa-user-circle"></i>
                Gestionar Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navLink" to="/gestion-predios">
                <i className="fas fa-chart-area"></i>
                Gestión Predios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navLink" to="/gestion-cultivos">
                <i className="fas fa-seedling"></i>
                Gestión Cultivos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navLink" to="/parametros-cultivos">
                <i className="fas fa-tasks"></i>
                Parametros Cultivos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navLink" to="/configurar-cultivos">
                <i className="fab fa-pagelines"></i>
                Configurar Cultivos
              </Link>
            </li>
          </>
        )}

        {rolUser === "configuracion" && (
          <>
            <li class="nav-item">
              <Link class="navLink" to="/mi-perfil">
                <i class="fas fa-user-circle"></i>
                Mi perfil
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navLink" to="/gestionar-predios">
                <i className="fas fa-chart-area"></i>
                Gestión Predios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navLink" to="/gestionar-cultivos">
                <i className="fas fa-seedling"></i>
                Gestión Cultivos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navLink" to="/parametrizar-cultivos">
                <i className="fas fa-tasks"></i>
                Parametros Cultivos
              </Link>
            </li>
          </>
        )}

        {rolUser === "gestion" && (
          <>
            <li class="nav-item">
              <Link class="navLink" to="/mi-perfil">
                <i class="fas fa-user-circle"></i>
                Mi perfil
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navLink" to="/configuracion-cultivos">
                <i className="fab fa-pagelines"></i>
                Configurar Cultivos
              </Link>
            </li>
          </>
        )}
      </ul>
      <hr className="border border-white" />
    </nav>
  );
};
export default Sidebar;
