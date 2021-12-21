import React from "react";
import MainModal from "./MainModal";
import Button from "react-bootstrap/Button";
import { useState,useEffect } from "react";
import { calculateConfig } from "../services/api";

const ViewModal = ({ modalView, setModalView,idConfig}) => {
  const [calculos,setCalculos] = useState(null);
  const generarCalculos = async () => {
    const response = await calculateConfig(idConfig);
    setCalculos(response);
  };
  useEffect(() => {
    generarCalculos();
  }, [idConfig]);


  return (
    <MainModal show={modalView} setShow={setModalView} title={"Información Cultivo"}>
      <h4>Costos</h4>
      <table class="table table-hover">
        <tr class="font-weight-bold">
          <th scope="row">Costos Semilla</th>
          <td>${calculos && calculos.costosSemilla}</td>
        </tr>
        <tr>
          <th scope="row">
            Costos m<sup>3</sup>agua
          </th>
          <td>${calculos && calculos.costosAgua}</td>
        </tr>
        <tr>
          <th scope="row">Costos Fertilizantes</th>
          <td>${calculos && calculos.costosFertilizante}</td>
        </tr>
        <tr>
          <th scope="row">Costos Totales</th>
          <td>
            <strong>${calculos && calculos.costoTotal}</strong>
          </td>
        </tr>
      </table>
      <h4>Fechas</h4>
      <table class="table table-hover">
        <tr class="font-weight-bold">
          <th scope="row">Fecha Siembra</th>
          <td>{calculos && calculos.fechaSiembra}</td>
        </tr>
        <tr>
          <th scope="row">Fecha Cosecha</th>
          <td>{calculos && calculos.fechaCosecha}</td>
        </tr>
      </table>

      <div className="mt-4">
        <Button
          className="me-3"
          variant="secondary"
          onClick={() => setModalView(false)}
        >
          Cerrar
        </Button>
      </div>
    </MainModal>
  );
};

export default ViewModal;
