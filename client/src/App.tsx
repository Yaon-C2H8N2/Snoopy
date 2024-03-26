import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router/Router.tsx";

function App() {
  /*
    const router = createBrowserRouter([
        {path: "/", element: <Prestation/>},
        {path: "/recap", element: <PrestationRecap/>}
    ])

    return (
        <RouterProvider router={router}/>
    )
    */
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
