import React from "react";
import profile from "../assets/img/profile.png";

function Profile() {
  /* const [user, setUser] = React.useState({}); */

  return (
    <>
      <div className="container mt-lg-4 ">
        <img
          src={profile}
          className="mx-auto d-block"
          alt="Foto_perfil"
          width="150"
          height="150"
        />
        <h3 className="mt-5 mb-5 text-center">Información Personal</h3>
      </div>
      <div className="container mt-2">
        <table className="table table-hover">
          <tr className="font-weight-bold">
            <th scope="row">No Identificación</th>
            <td>1000000000</td>
          </tr>
          <tr>
            <th scope="row">Nombres</th>
            <td>Luigy</td>
          </tr>
          <tr>
            <th scope="row">Apellidos</th>
            <td>De La Torre</td>
          </tr>
          <tr>
            <th scope="row">Correo Electrónico</th>
            <td>luigyd@uninorte.edu.co</td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default Profile;
