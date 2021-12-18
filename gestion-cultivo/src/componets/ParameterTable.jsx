import React from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ParameterTable = ({setModal,setModalUpdate}) => {
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
        
    }).then((result) => {
        if (result.value) {
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
            <th scope="col">Cultivo</th>
            <th scope="col">Valor Semilla</th>
            <th scope="col">Valor m<sup>3</sup> agua</th>
            <th scope="col">Valor kg fertilizante</th>
            <th scope="col">Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
            <button
                type="button"
                className="btn btn-warning mx-auto"
                onClick={()=>setModalUpdate(true)}
            >
                <i className="far fa-edit"></i>
            </button>
            <button type="button" className="btn btn-danger mx-auto" onClick={()=>deleteRow()}>
                <i className="far fa-trash-alt"></i>
            </button>
            </td>
        </tr>
        </tbody>
    </table>
    </>
);
};

export default ParameterTable;
