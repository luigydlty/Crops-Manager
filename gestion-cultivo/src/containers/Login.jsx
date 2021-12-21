import React from "react";
import logo from "../assets/img/logo.svg";
import { useState,useContext } from "react"
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../services/api";
import {useNavigate} from 'react-router-dom'
import { AppContext } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate()
  const { setCorreo,setUser } = useContext(AppContext);
  const [showpass, setShowpass] = useState(false);
  const handleShowpass = () => {
    setShowpass(!showpass);
  };
  const formik = useFormik({
    initialValues: {
    correo: "",
      contrasena: "",
    },
    validationSchema: Yup.object({
    correo: Yup.string()
        .email("Email no válido")
        .required("El email es obligatorio"),
      contrasena: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .required("La contraseña es obligatoria"),
    }),
    onSubmit: async(values) => {
      await loginUser(values.correo, values.contrasena)
        .then((res) => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("correo", values.correo);
          localStorage.setItem("rol", res.rol);
          setCorreo(values.correo);
          setUser(true);
          if (res.rol === "administrador") {
            navigate('/homeAdmin')
          } else if (res.rol === "configuracion") {
            navigate('/homeConfig')
          }else if (res.rol === "gestion") {
            navigate('/homeManage')
          }
        })
        .catch((err) => {
          console.log(err);
        }
        );

    },
  });



  return (
    <div style={{ backgroundColor: "#00AF91" }}>
      <div className="container align-items-center vh-100">
        <div className="row justify-content-md-center align-items-center">
          <div className="bg-green" style={{padding: "30px 15px",borderRadius: "20px",width: "300px"}}>
            <div>
              <img
                className="container-fluid w-75 h-auto mb-2 mx-auto d-block"
                src={logo}
                alt="logo cultivos la planicie"
              />
            </div>
            <hr className="border border-white" />
            <div className="card-body">
              <form className="login-focus" onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label for="email" className="form-label text-white">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control "
                    id="correo"
                    name="correo"
                    value={formik.values.correo}
                    onChange={formik.handleChange}
                    placeholder="name@cultivoslaplanicie.com"
                  />
                </div>

                <div className="mb-3">
                  <label for="password" className="form-label text-white">
                    Contraseña
                  </label>
                  <span className="icon-eye" onClick={() => handleShowpass()}>
                    <i className={`fas ${showpass?'fa-eye':'fa-eye-slash'}` }></i>
                  </span>
                  <input
                    type={showpass ? "text" : "password"}
                    className="form-control"
                    id="contrasena"
                    name="contrasena"
                    value={formik.values.contrasena}
                    onChange={formik.handleChange}
                    placeholder="Contraseña"
                  />
                </div>
                <div className="d-grid gap-2 col-6 mx-auto mt-4">
                  <button className="btn-orange" type="submit">
                    Ingresar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
