import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { deleteConfig } from "../services/api";
import ConfigModalManage from "./ConfigModalManage";
import { useState } from "react";

const ConfigTableManage = ({ setModal, configs, obtenerConfiguracion }) => {
  const [modalUpdate, setModalUpdate] = useState(false);
  const [config, setConfig] = useState({});
  const handleUpdate = (
    idPredio,
    idCultivo,
    tiempoCultivo,
    areaCultivo,
    cantidadSemillas,
    cantidadAgua,
    cantidadFertilizante,
    tiempoRecoleccion,
    kgProyectado,
    tiempoMinimo,
    fechaSiembra,
    fechaCosecha,
    id
  ) => {
    setConfig({
      idPredio,
      idCultivo,
      tiempoCultivo,
      areaCultivo,
      cantidadSemillas,
      cantidadAgua,
      cantidadFertilizante,
      tiempoRecoleccion,
      kgProyectado,
      tiempoMinimo,
      fechaSiembra,
      fechaCosecha,
      id,
    });
    setModalUpdate(true);
  };

  const MySwal = withReactContent(Swal);
  function deleteRow(id) {
    MySwal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007965",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        await deleteConfig(id);
        obtenerConfiguracion();
        Swal.fire("Eliminado!", "Tu registro ha sido eliminado.", "success");
      }
    });
  }

  return (
    <>
      <table className="table table-hover mt-3 fs-6">
        <thead>
          <tr>
            <th scope="col">Id Predio</th>
            <th scope="col">Cultivo</th>
            <th scope="col">Área</th>
            <th scope="col">Semilla</th>
            <th scope="col">
              Agua m<sup>3</sup>
            </th>
            <th scope="col">Fertilizante</th>
            <th scope="col">Kg Proy</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {configs.length > 0 &&
            configs.map((config) => (
              <tr key={config._id}>
                <td>{config.IdPredio}</td>
                <td>{config.IdCultivo}</td>
                <td>{config.AreaCultivo}</td>
                <td>{config.CantidadSemillas}</td>
                <td>{config.CantidadAgua}</td>
                <td>{config.CantidadFertilizante}</td>
                <td>{config.KgProyectado}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success mx-auto"
                    // onClick={()=>setModalView(true)}
                  >
                    <i className="far fa-eye"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning mx-auto"
                    onClick={() =>
                      handleUpdate(
                        config.IdPredio,
                        config.IdCultivo,
                        config.TiempoCultivo,
                        config.AreaCultivo,
                        config.CantidadSemillas,
                        config.CantidadAgua,
                        config.CantidadFertilizante,
                        config.TiempoRecoleccion,
                        config.KgProyectado,
                        config.TiempoMinimo,
                        config.FechaSiembra,
                        config.FechaCosecha,
                        config._id
                      )
                    }
                  >
                    <i className="far fa-edit"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mx-auto"
                    onClick={() => deleteRow(config._id)}
                  >
                    <i className="far fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ConfigModalManage
          modal={modalUpdate}
          modalType={"update"}
          setModal={setModalUpdate}
          updateConfig={obtenerConfiguracion}
          config={config}
        /> 
    </>
  );
};

export default ConfigTableManage;