import Prestation from "./components/Prestation/Prestation.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PrestationRecap from "./components/Prestation/PrestationRecap.tsx";

function App() {

    const router = createBrowserRouter([
        {path: "/", element: <Prestation/>},
        {path: "/recap", element: <PrestationRecap/>}
    ])

    return (
        <RouterProvider router={router}/>
    )
}

export default App
