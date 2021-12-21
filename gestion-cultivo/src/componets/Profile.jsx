import React from "react";
import profile from "../assets/img/profile.png";

function Profile() {
  const [user, setUser] = React.useState({}); 
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);
  


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
            <td>{user.Identificacion}</td>
          </tr>
          <tr>
            <th scope="row">Nombres</th>
            <td>{user.Nombres}</td>
          </tr>
          <tr>
            <th scope="row">Apellidos</th>
            <td>{user.Apellidos}</td>
          </tr>
          <tr>
            <th scope="row">Correo Electrónico</th>
            <td>{user.Correo}</td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default Profile;
