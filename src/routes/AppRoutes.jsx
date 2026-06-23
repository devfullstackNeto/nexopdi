import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Empresas from '../pages/Empresas'
import Projetos from '../pages/Projetos'
import WorkflowProjetos from '../pages/WorkflowProjetos'
import Evidencias from '../pages/Evidencias'
import Usuarios from '../pages/Usuarios'

import AdminLayout from '../layouts/AdminLayout'

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route element={<AdminLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/empresas"
                        element={<Empresas />}
                    />

                    <Route
                        path="/projetos"
                        element={<Projetos />}
                    />

                    <Route
                        path="/workflow"
                        element={<WorkflowProjetos />}
                    />

                    <Route
                        path="/evidencias"
                        element={<Evidencias />}
                    />

                    <Route
                        path="/usuarios"
                        element={<Usuarios />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    )

}