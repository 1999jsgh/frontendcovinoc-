import { useReducer } from "react";
import Reducer from "../reducer/Reducer";
import Store from "./Store";

const StoreFromProvider = (props) => { //Esta es la clase padre provider, la cual permite tener un contexto de los componentes

    const initialState = { // Se inicializa los states
        usuario: { list: [], item: {} }
    };

    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Store.Provider value={{ //Compartimos el el state con todos los componentes dentro del provider
            state,
            dispatch
        }}>
            {props.children}
        </Store.Provider>
    );

}

export default StoreFromProvider;