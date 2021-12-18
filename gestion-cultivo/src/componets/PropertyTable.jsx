import React from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { deleteProperty} from "../services/api";
import PropertyModal from "./PropertyModal";
import { useState } from "react";

const PropertyTable = ({propertys,obtenerPredio}) => {
    const [modalUpdate, setModalUpdate] = useState(false);
    const [property,setProperty] = useState({})
    const handleUpdate = (idPredio,idPropietario,cantidadHectareas,ubicacion,longitudLatitud,id) => {
        setProperty({idPredio,idPropietario,cantidadHectareas,ubicacion,longitudLatitud,id})
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
            await deleteProperty(id)
            obtenerPredio()
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
        <th scope="col">Id Predio</th>
            <th scope="col">Id Propetario</th>
            <th scope="col">Cantidad Hectareas</th>
            <th scope="col">Ubicación</th>
            <th scope="col">Latitud y Longitud</th>
            <th scope="col">Acciones</th>
        </tr>
        </thead>
        <tbody>
        {propertys.length>0 && propertys.map(property => (
            <tr key={property._id}>
                <td>{property.IdPredio}</td>
                <td>{property.IdPropietario}</td>
                <td>{property.CantHectarea}</td>
                <td>{property.Ubicacion}</td>
                <td>{property.LongitudLatitud}</td>
                <td>
                <button
                    type="button"
                    className="btn btn-warning mx-auto"
                    onClick={()=>handleUpdate(property.IdPredio,property.IdPropietario,property.CantHectarea,property.Ubicacion,property.LongitudLatitud,property._id)}
                >
                    <i className="far fa-edit"></i>
                </button>
                <button type="button" className="btn btn-danger mx-auto" onClick={()=>deleteRow(property._id)}>
                    <i className="far fa-trash-alt"></i>
                </button>
                </td>
            </tr>))} 
        </tbody>
    </table>
    <PropertyModal
          modal={modalUpdate}
          modalType={"update"}
          setModal={setModalUpdate}
          updatePropertys={obtenerPredio}
          property={property}
        /> 
    </>
);
};

export default PropertyTable;
