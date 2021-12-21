import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import AppContextProvider from "./context/AppContext";
import PrivateRoute from "./componets/PrivateRoute";
import Login from "./containers/Login";
import HomeAdmin from "./containers/HomeAdmin";
import HomeConfig from "./containers/HomeConfig";
import HomeManage from "./containers/HomeManage";
import UserAdmin from "./containers/UserAdmin";
import PropertyAdmin from "./containers/PropertyAdmin";
import CropsAdmin from "./containers/CropsAdmin";
import ParametersAdmin from "./containers/ParametersAdmin";
import ConfigAdmin from "./containers/ConfigAdmin";
import PropertyConfig from "./containers/PropertyConfig";
import CropsConfig from "./containers/CropsConfig";
import ParametersConfig from "./containers/ParametersConfig";
import ConfigManage from "./containers/ConfigManage";
import Profile from "./containers/Profiles";
import Profiles from "./containers/Profiles";

function App() {
  return (
    <AppContextProvider>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/homeAdmin" element={<PrivateRoute><HomeAdmin /></PrivateRoute>}/>
            <Route path="/homeConfig" element={<PrivateRoute><HomeConfig /></PrivateRoute>} />
            <Route path="/homeManage" element={<PrivateRoute><HomeManage /></PrivateRoute>} />
            <Route path="/userAdmin" element={<PrivateRoute><UserAdmin /></PrivateRoute>} />
            <Route path="/gestion-predios" element={<PrivateRoute><PropertyAdmin /></PrivateRoute>} />
            <Route path="/gestionar-predios" element={<PrivateRoute><PropertyConfig/></PrivateRoute>} />
            <Route path="/gestion-cultivos" element={<PrivateRoute><CropsAdmin /></PrivateRoute>} />
            <Route path="/gestionar-cultivos" element={<PrivateRoute><CropsConfig /></PrivateRoute>} />
            <Route path="/parametros-cultivos" element={<PrivateRoute><ParametersAdmin /></PrivateRoute>} />
            <Route path="/parametrizar-cultivos" element={<PrivateRoute><ParametersConfig /></PrivateRoute>} />
            <Route path="/configurar-cultivos" element={<PrivateRoute><ConfigAdmin /></PrivateRoute>} />
            <Route path="/configuracion-cultivos" element={<PrivateRoute><ConfigManage /></PrivateRoute>} />
            <Route path="/mi-perfil" element={<PrivateRoute><Profiles/></PrivateRoute>} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </AppContextProvider>
  );
}

export default App;
