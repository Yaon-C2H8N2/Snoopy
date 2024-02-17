import {AuthProvider, RequireAuth} from "../Auth";
import {Route, Routes} from "react-router-dom";
import PrestationRecap from "../Prestation/PrestationRecap.tsx";
import Prestation from "../Prestation/Prestation.tsx";
import NoMatch from "./NoMatch.tsx";
import Login from "../Auth/LoginForm.tsx";
import Layout from "./Layout.tsx";

const Router = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Layout />
                        </RequireAuth>
                    }
                >
                    <Route path="/" element={<Prestation />} />

                    <Route path="/recap" element={<PrestationRecap />} />
                </Route>

                <Route path="*" element={<NoMatch />} />
            </Routes>
        </AuthProvider>
    );
};

export default Router;