import React from "react";
import { Modal} from "react-bootstrap";

const MainModal = ({show,setShow,children,title}) => {
  const handleClose = () => setShow(false);
  /* const handleShow = () => setShow(true); */

  return (
    <Modal show={show} onHide={handleClose} >
      <Modal.Header className="bg-green text-white">
        <Modal.Title >{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{children}</p>
      </Modal.Body>
{/*       <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default MainModal;
