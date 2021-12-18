import React from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { deleteParameter } from "../services/api";
import ParameterModal from "./ParameterModal";
import { useState } from "react";

const ParameterTable = ({setModal,parameters,obtenerParametro}) => {
    const [modalUpdate, setModalUpdate] = useState(false);
    const [parameter,setParameter] = useState({})
    const handleUpdate = (idCultivo, valorSemilla, valorAgua, valorFertilizante,id) => {
        setParameter({idCultivo, valorSemilla, valorAgua, valorFertilizante,id})
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
            await deleteParameter(id)
            obtenerParametro()
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
            <th scope="col">IdCultivo</th>
            <th scope="col">Valor Semilla</th>
            <th scope="col">Valor m<sup>3</sup> agua</th>
            <th scope="col">Valor kg fertilizante</th>
            <th scope="col">Acciones</th>
        </tr>
        </thead>
        <tbody>
        {parameters.length>0 && parameters.map(parameter => (
            <tr key ={parameter._id}>
                <td>{parameter.IdCultivo}</td>
                <td>{parameter.ValorSemilla}</td>
                <td>{parameter.ValorAgua}</td>
                <td>{parameter.ValorFertilizante}</td>
                <td>
                <button
                    type="button"
                    className="btn btn-warning mx-auto"
                    onClick={()=>handleUpdate(parameter.IdCultivo,parameter.ValorSemilla,parameter.ValorAgua,parameter.ValorFertilizante,parameter._id)}
                >
                    <i className="far fa-edit"></i>
                </button>
                <button type="button" className="btn btn-danger mx-auto" onClick={()=>deleteRow(parameter._id)}>
                    <i className="far fa-trash-alt"></i>
                </button>
                </td>
        </tr>))}
        </tbody>
    </table>
    <ParameterModal
          modal={modalUpdate}
          modalType={"update"}
          setModal={setModalUpdate}
          updateParameters={obtenerParametro}
          parameter={parameter}
        /> 
    </>
);
};

export default ParameterTable;
