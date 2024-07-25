
import { useEffect, useState } from "react";
import { Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { URL } from './config';

import { TitolContainer } from './styled_common';
import { ToastContainer, toast } from "react-toastify";


function Llista() {

  const [usuaris, setUsuaris] = useState([]);
  const [elimina, setElimina] = useState(null);

  function getUsuaris() {
    fetch(URL + "/api/usuari")
      .then(results => results.json())
      .then(results => {
        if (results.ok) {
          setUsuaris(results.data);
        }})
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getUsuaris();
    return ()=>setUsuaris([])
  }, [])

  function eliminaUsuari() {
    fetch(URL + "/api/usuari/" + elimina, { method: "DELETE" })
      .then(results => results.json())
      .then(res => {
        console.log("resultats: ", res);
        if (res.ok) {
          toast.success("Usuari eliminat", { onClose: () => {setElimina(null); getUsuaris();} }  );
        } else {
          console.log(res);
          toast.error("Error: " + res.error);
        }
      })
      .catch(err => toast.error("Error: " + err.message));
  }

  if (!usuaris.length) {
    return <>Carregant...</>;
  }

  const filesTaula = usuaris.map((el) =>
    <tr key={el.id}>
      <td>{el.id}</td>
      <td>{el.nom}</td>
      <td>{el.email}</td>
      <td>{el.foto ? <MostraFoto foto={el.foto} /> : "No foto"}</td>
      <td><Button onClick={()=>setElimina(el.id)}>Elimina</Button></td>
    </tr>
  );

  return (
    <>
      <TitolContainer>
        <h3>Usuaris</h3>
        <Link className="btn btn-success" to={"/nou_usuari"}>Afegir usuari</Link>
      </TitolContainer>
      <ToastContainer  />
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Foto</th>
              </tr>
            </thead>
            <tbody>
              {filesTaula}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={elimina} >
        <Modal.Header >
          <Modal.Title>Confirmar eliminació</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setElimina(null)}>
            Cancel.lar
          </Button>
          <Button variant="danger" onClick={eliminaUsuari}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default Llista
