import React, { Fragment, useContext, useRef, useState } from 'react';
import Store from '../store/Store';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { HOST_API } from '../config/hostApi';

const UserCreateForm = () => {
  let history = useNavigate();
  const formRef = useRef(null);
  const { state: { usuario } } = useContext(Store); //Traemos el contexto global
  const item = usuario.item;
  const [state, setState] = useState(item);

  const redireccionar = () => {
    window.history.back();
  }

  const validate = (event) => { // Creamos una cuadro de confirmacion 
    swal({
      title: "¿Agregar?",
      text: "¡Se agregará este nuevo usuario a la base de datos!",
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
      .then((agregar) => {
        if (agregar) {
          swal("¡Se ha agregado con exito!", {
            icon: "success",
            button: true
          }).then((aceptar) => {
            onAdd(event);//Cuando sea exitoso se ira al evento de agregar
            history("/", { replace: true })//Cuando sea exitoso se regresa a la tabla principal
          });

        } else {
          swal("uff, que bueno que preguntamos");
          return;
        }
      });
  }

  const onAdd = (event) => {
    event.preventDefault();

    const request = {//Inicializamos los datos tomados en el state en un objeto
      nombre: state.nombre,
      id: null,
      telefono: state.telefono,
      identificacion: state.identificacion,
    };

    axios.post(HOST_API + "/user/newUser", request).then(response => {  // se realiza la peticion pos
      redireccionar();// se redirecciona a la pagina anterior cuando el servidor nos responda
      formRef.current.reset(); //Limpiamos los campos
    })
  }

  return (
    // Retornamos un formulario
    <Fragment>
      <div className="contaniner-sm m-4">
        <form className="contaniner m-3" ref={formRef}>
          <h1 className="text-center mt-1" style={{ color: "#fe5a59" }}>
            Agregar nuevo usuario
          </h1>
          <hr />
          <div className="container-md shadow p-4 mb-3 bg-white rounded form-group mx-10">
            <div className="mb-3">
              <label className="form-label">Nombre del usuario</label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                placeholder={usuario.nombre}
                defaultValue={state.nombre}
                onChange={(event) => {
                  setState({ ...state, nombre: event.target.value });
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Identificación del usuario</label>
              <input
                className="form-control"
                type="text"
                name="identificacion"
                placeholder={usuario.identificacion}
                defaultValue={state.identificacion}
                onChange={(event) => {
                  setState({ ...state, identificacion: event.target.value });
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono del usuario</label>
              <input
                className="form-control"
                type="number"
                name="telefono"
                placeholder={usuario.telefono}
                defaultValue={state.telefono}
                onChange={(event) => {
                  setState({ ...state, telefono: event.target.value });
                }}
              ></input>
            </div>
          </div>
        </form>
        <div className="position-relative mt-5">
          <button
            className="btn btn-dark btn-lg mb-5 top-0 start-50 position-absolute translate-middle"
            onClick={validate}
          >
            Crear
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default UserCreateForm;