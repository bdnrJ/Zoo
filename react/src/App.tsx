import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./views/Home/Home";
import Login from "./views/Login";
import Register from "./views/Register";

export const Layout = () => {
    return (
        <>
        <Navbar/>
        <Outlet />
        <Footer />
        </>
    )
    }

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
            path: "/",
            element: <Home />
            },
        ]
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    }
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    )
}

export default App
