import React from 'react'
import UserCreateForm from '../user/create.user.form';
import UserEditForm from '../user/edit.user.form';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Routes,
} from 'react-router-dom';
import Users from '../user/user.table';

export default function AppRouter() {

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Users />} />
                <Route exact path="/createUser" element={<UserCreateForm />} />
                <Route path="/editarUsuario/:id" element={<UserEditForm />} />
            </Routes>
        </Router>
    )
        

}
