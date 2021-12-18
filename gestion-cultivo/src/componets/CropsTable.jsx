import React from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { deleteCrop } from "../services/api";
import CropsModal from "./CropsModal";
import { useState } from "react";

const CropsTable = ({setModal,crops,obtenerCultivo}) => {
    const [modalUpdate, setModalUpdate] = useState(false);
    const [crop,setCrop] = useState({})
    const handleUpdate = (nombreCultivo, descripcion ,id) => {
        setCrop({nombreCultivo, descripcion, id})
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
            await deleteCrop(id)
            obtenerCultivo()
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
            <th scope="col">Nombre Cultivo</th>
            <th scope="col">Descripción Cultivo</th>
            <th scope="col">Acciones</th>
        </tr>
        </thead>
        <tbody>
        {crops.length > 0 && crops.map(crop => (
            <tr key={crop._id}>
                <td>{crop.NombreCultivo}</td>
                <td>{crop.Descripcion}</td>
            <td>
            <button
                type="button"
                className="btn btn-warning mx-auto"
                onClick={()=>handleUpdate(crop.NombreCultivo, crop.Descripcion, crop._id)}
            >
                <i className="far fa-edit"></i>
            </button>
            <button type="button" className="btn btn-danger mx-auto" onClick={()=>deleteRow(crop._id)}>
                <i className="far fa-trash-alt"></i>
            </button>
            </td>
        </tr>))}
        </tbody>
    </table>
    <CropsModal
          modal={modalUpdate}
          modalType={"update"}
          setModal={setModalUpdate}
          updateCrops={obtenerCultivo}
          crop={crop}
        /> 
    </>
);
};

export default CropsTable;