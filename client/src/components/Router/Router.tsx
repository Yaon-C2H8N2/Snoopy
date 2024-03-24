import {AuthProvider, RequireAdmin, RequireAuth} from "../Auth";
import {Route, Routes} from "react-router-dom";
import PrestationRecap from "../Prestation/PrestationRecap.tsx";
import Prestation from "../Prestation/Prestation.tsx";
import NoMatch from "./NoMatch.tsx";
import Login from "../Auth/LoginForm.tsx";
import Layout from "./Layout.tsx";
import Home from "../Home/Home.tsx";
import PrestationList from "../PrestationList/PrestationList.tsx";
import Admin from "../Admin/Admin.tsx";

const Router = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/admin"
                       element={
                            <RequireAdmin>
                                <Layout />
                            </RequireAdmin>
                       }
                >
                    <Route path="" element={<Admin />} />
                </Route>
                <Route
                    path="/prestation"
                    element={
                        <RequireAuth>
                            <Layout />
                        </RequireAuth>
                    }
                >
                    <Route path="" element={<Prestation />} />
                    <Route path="recap" element={<PrestationRecap />} />
                    <Route path="list" element={<PrestationList />} />
                </Route>

                <Route path="*" element={<NoMatch />} />
            </Routes>
        </AuthProvider>
    );
};

export default Router;