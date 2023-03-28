import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import RequireAdmin from "./components/ProtectedRoutes/RequireAdmin";
import RequireUnloggedUser from "./components/ProtectedRoutes/RequireUnloggedUser";
import TESTadmin from "./views/AdminViews/TESTadmin";
import FourZeroFour from "./views/FourZeroFour";
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
            {
            path: "/TESTadmin",
            element:
                <RequireAdmin>
                    <TESTadmin />
                </RequireAdmin>
            },
            {
                path: '/*',
                element: <FourZeroFour />
            }
        ]
    },
    {
        path: "/login",
        element:
            <RequireUnloggedUser>
                <Login />,
            </RequireUnloggedUser>
    },
    {
        path: "/register",
        element:
            <RequireUnloggedUser>
                <Register />,
            </RequireUnloggedUser>
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    )
}

export default App
