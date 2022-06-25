import React, { useContext, useRef, useState, useEffect, Fragment } from 'react';
import Store from '../store/Store';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import swal from 'sweetalert';
import { HOST_API } from '../config/hostApi';


const UserEditForm = () => {

    let { id } = useParams();
    //let history = useNavigate();
    const formRef = useRef(null);
    const { state: { usuario } } = useContext(Store); //Traemos el contexto global
    const item = usuario.item;
    const [state, setState] = useState(item);
    const [loading, setLoading] = useState(true)
    const redireccionar = () => {
        window.history.back();
      }
    const cargarUsuario = async () => { //Hacemos una peticion para traer el usuario por su ID
        console.log("item->", state)
        setLoading(true)
        const listaTemporal = await axios
            .get(HOST_API + "/usuario/" + id)
            .then((response) => {
                setState(response.data);
                console.log(response.data)
                setLoading(false)
            })
        setLoading(false)
    }

    useEffect(() => {
        cargarUsuario()
    }, []);

    const validate = (event) => { // Creamos una cuadro de confirmacion 
        swal({
            title: "¿Actualizar?",
            text: "¡Se ¿Actualizará este usuario en la base de datos!",
            icon: "info",
            buttons: true,
            dangerMode: true,
        })
            .then((editar) => {
                if (editar) {
                    swal("¡Se ha actualizado con exito!", {
                        icon: "success",
                        button: true
                    }).then((aceptar) => {
                        onEdit(event); //Cuando sea exitoso se ira al evento de editar
                  //      history("/", { replace: true });
                    });
                } else {
                    swal("uff, que bueno que preguntamos");
                    return;
                }
            });
    }

    const onEdit = (event) => {
        event.preventDefault();

        const request = { //Inicializamos los datos del state en un objeto
            nombre: state.nombre,
            id: id,
            telefono: state.telefono,
            identificacion: state.identificacion,
        };

        axios.put(HOST_API + "/user/updateUser/" + id, request).then(response => { // se realiza la peticion put
            redireccionar();
            formRef.current.reset(); //Limpiamos los campos del formulario
        })
    }

    return (
        <Fragment>
            <div className="contaniner m-5">
                <form className="contaniner m-2" ref={formRef}>
                    <h1 className="text-center mt-1 p-1" style={{ color: '#fe5a59' }} >Editar usuario</h1>
                    <hr />
                    <div className="container-md shadow p-3 mb-3 bg-white rounded form-group mx-10">
                        <div className="mb-3">
                            <label className="form-label">Nombre del usuario</label>
                            <input
                                className="form-control"
                                type="text"
                                name="nombre"
                                placeholder={usuario.nombre}
                                defaultValue={state.nombre}
                                onChange={(event) => {
                                    setState({ ...state, nombre: event.target.value })
                                }}  ></input>
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
                                    setState({ ...state, identificacion: event.target.value })
                                }}  ></input>
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
                                    setState({ ...state, telefono: event.target.value })
                                }}  ></input>
                        </div>
                        </div>
                    <br></br>
                </form>
                <div className="m-2 position-relative">
                    <button className="btn btn-dark btn-lg mb-5 top-0 start-50 position-absolute translate-middle"
                        onClick={validate}>Actualizar</button>
                </div>
            </div>
        </Fragment>
    );
}

export default UserEditForm;