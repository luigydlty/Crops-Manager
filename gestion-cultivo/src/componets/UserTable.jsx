import React from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { deleteUser } from "../services/api";
import UserModal from "./UserModal";
import { useState } from "react";

const UserTable = ({setModal,users,obtenerUsuario}) => {

    const [modalUpdate, setModalUpdate] = useState(false);
    const [user,setUser] = useState({})
    const handleUpdate = (nombres,apellidos,correo,rol,id) => {
        setUser({nombres,apellidos,correo,rol,id})
        setModalUpdate(true)
    }
    const MySwal = withReactContent(Swal)
    function deleteRow(id) {MySwal.fire({
        title: '¿Estas seguro?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#007965',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar'
        
    }).then(async(result) => {
        if (result.value) {
            await deleteUser(id)
            obtenerUsuario()
            Swal.fire(
                'Eliminado!',
                'Tu registro ha sido eliminado.',
                'success'
            )
        }
    })}

return (
    <>
    <table className="table table-hover mt-3">
        <thead>
        <tr>
            <th scope="col">No Identificación</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Rol</th>
            <th scope="col">E-mail</th>
            <th scope="col">Acción</th>
        </tr>
        </thead>
        <tbody>
        {users.length>0 && users.map(user => (
            <tr key={user._id}>
                <td>{user.Identificacion}</td>
                <td>{user.Nombres}</td>
                <td>{user.Apellidos}</td>
                <td>{user.Rol}</td>
                <td>{user.Correo}</td>
                <td>
                <button
                    type="button"
                    className="btn btn-warning mx-auto"
                    onClick={()=>handleUpdate(user.Nombres,user.Apellidos,user.Correo,user.Rol,user._id)}
                >
                    <i className="far fa-edit"></i>
                </button>
                <button type="button" className="btn btn-danger mx-auto" onClick={()=>deleteRow(user._id)}>
                    <i className="far fa-trash-alt"></i>
                </button>
                </td>
            </tr>))} 
        </tbody>
    </table>
        <UserModal
          modal={modalUpdate}
          modalType={"update"}
          setModal={setModalUpdate}
          updateUsers={obtenerUsuario}
          user={user}
        /> 
    </>
);
};

export default UserTable;
