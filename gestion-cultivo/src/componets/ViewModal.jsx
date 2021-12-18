import React from "react";
import MainModal from "./MainModal";
import Button from "react-bootstrap/Button";

const ViewModal = ({ modalView, setModalView}) => {
  return (
    <MainModal show={modalView} setShow={setModalView} title={"Información Cultivo"}>
      <table class="table table-hover">
        <tr class="font-weight-bold">
          <th scope="row">Costos Semilla</th>
          <td>$4.000.000</td>
        </tr>
        <tr>
          <th scope="row">
            Costos m<sup>3</sup> agua
          </th>
          <td>$3.000.000</td>
        </tr>
        <tr>
          <th scope="row">Costos Fertilizantes</th>
          <td>$2.580.000</td>
        </tr>
        <tr>
          <th scope="row">Costos Totales</th>
          <td>
            <strong>$9.580.000</strong>
          </td>
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
