import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./views/Home/Home";
import Login from "./views/Login";

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
            path: "/login",
            element: <Login />
            }
        ]
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
