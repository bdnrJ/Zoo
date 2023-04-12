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
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import Tickets from "./views/UserViews/Tickets/Tickets";
import { NormalTickets } from "./views/UserViews/Tickets/NormalTickets";
import { GroupTickets } from "./views/UserViews/Tickets/GroupTickets";
import NormalCheckout from "./views/UserViews/Tickets/NormalCheckout";
import { TicketProvider } from "./context/TicketContext";
import GroupCheckout from "./views/UserViews/Tickets/GroupCheckout";
import Transactions from "./views/AdminViews/Transactions";
import TransactionPage from "./views/TransactionPage";

const queryClient = new QueryClient();

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
                        <QueryClientProvider client={queryClient}>
                            <TESTadmin />
                        </QueryClientProvider>
                    </RequireAdmin>
            },
            {
                path: '/admin/transactions',
                element:
                <RequireAdmin>
                    <QueryClientProvider client={queryClient}>
                        <Transactions />
                    </QueryClientProvider>
                </RequireAdmin>
            },
            {
                path: '/admin/transactionPage/:id',
                element:
                <RequireAdmin>
                    <TransactionPage />
                </RequireAdmin>
            },
            {
                path: '/tickets',
                element: <Tickets />
            },
            {
                path: '/tickets/normal',
                element: <NormalTickets />
            },
            {
                path: '/tickets/normal/checkout',
                element: <NormalCheckout/>
            },
            {
                path: '/tickets/group',
                element: <GroupTickets />
            },
            {
                path: '/tickets/group/checkout',
                element: <GroupCheckout />
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
            <RequireUnloggedUser >
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
