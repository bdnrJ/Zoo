import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import RequireAdmin from "./components/ProtectedRoutes/RequireAdmin";
import RequireUnloggedUser from "./components/ProtectedRoutes/RequireUnloggedUser";
import FourZeroFour from "./views/FourZeroFour";
import Home from "./views/Home/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
import Tickets from "./views/UserViews/Tickets/Tickets";
import { NormalTickets } from "./views/UserViews/Tickets/NormalTickets";
import { GroupTickets } from "./views/UserViews/Tickets/GroupTickets";
import NormalCheckout from "./views/UserViews/Tickets/NormalCheckout";
import GroupCheckout from "./views/UserViews/Tickets/GroupCheckout";
import Transactions from "./views/AdminViews/Transactions";
import TransactionPage from "./views/AdminViews/TransactionPage";
import Users from "./views/AdminViews/Users";
import UserPage from "./views/AdminViews/UserPage";
import TicketTypes from "./views/AdminViews/TicketTypes";
import UserPersonalPage from "./views/UserViews/UserPersonalPage";
import Statute from "./views/Statute";
import Facilities from "./views/Facilities";
import Foundation from "./views/Foundation";
import UserTickets from "./views/UserViews/UserTickets";
import RequireUser from "./components/ProtectedRoutes/RequireUser";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./views/AdminViews/Services";
import DonationCheckout from "./components/Popups/DonationCheckout";
import Donations from "./views/AdminViews/Donations";
import MyDonations from "./views/MyDonations";
import { LoadingProvider } from "./context/LoadingContext";
import LoadingIndicator from "./components/LoadingIndicator";

const queryClient = new QueryClient();

export const Layout = () => {
    return (
        <ScrollToTop>
            <div className="layout">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </ScrollToTop>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/admin/users",
                element: (
                    <RequireAdmin>
                        <QueryClientProvider client={queryClient}>
                            <Users />
                        </QueryClientProvider>
                    </RequireAdmin>
                ),
            },
            {
                path: "/admin/transactions",
                element: (
                    <RequireAdmin>
                        <QueryClientProvider client={queryClient}>
                            <Transactions />
                        </QueryClientProvider>
                    </RequireAdmin>
                ),
            },
            {
                path: "/admin/transaction_page/:id",
                element: (
                    <RequireAdmin>
                        <TransactionPage />
                    </RequireAdmin>
                ),
            },
            {
                path: "/admin/user_page/:id",
                element: (
                    <RequireAdmin>
                        <UserPage />
                    </RequireAdmin>
                ),
            },
            {
                path: "/admin/ticket_types",
                element: (
                    <RequireAdmin>
                        <TicketTypes />
                    </RequireAdmin>
                ),
            },
            {
                path: "/admin/services",
                element: (
                    <RequireAdmin>
                        <Services />
                    </RequireAdmin>
                ),
            },
            {
                path: "/admin/donations",
                element: (
                    <RequireAdmin>
                        <QueryClientProvider client={queryClient}>
                            <Donations />
                        </QueryClientProvider>
                    </RequireAdmin>
                ),
            },
            {
                path: "/tickets",
                element: <Tickets />,
            },
            {
                path: "/tickets/normal",
                element: <NormalTickets />,
            },
            {
                path: "/tickets/normal/checkout",
                element: <NormalCheckout />,
            },
            {
                path: "/tickets/group",
                element: <GroupTickets />,
            },
            {
                path: "/tickets/group/checkout",
                element: <GroupCheckout />,
            },
            {
                path: "/my_account",
                element: (
                    <RequireUser>
                        <UserPersonalPage />
                    </RequireUser>
                ),
            },
            {
                path: "/my_tickets",
                element: (
                    <RequireUser>
                        <UserTickets />
                    </RequireUser>
                ),
            },
            {
                path: "/my_donations",
                element: (
                    <RequireUser>
                        <MyDonations />
                    </RequireUser>
                ),
            },
            {
                path: "/statute",
                element: <Statute />,
            },
            {
                path: "/facilities",
                element: <Facilities />,
            },
            {
                path: "/foundation",
                element: <Foundation />,
            },
            {
                path: "/donation_checkout",
                element: <DonationCheckout />,
            },
            {
                path: "/*",
                element: <FourZeroFour />,
            },
        ],
    },
    {
        path: "/login",
        element: (
            <RequireUnloggedUser>
                <Login />
            </RequireUnloggedUser>
        ),
    },
    {
        path: "/register",
        element: (
            <RequireUnloggedUser>
                <Register />
            </RequireUnloggedUser>
        ),
    },
]);

function App() {
    return (
        <LoadingProvider>
            <LoadingIndicator />
            <div className="App">
                <RouterProvider router={router} />
            </div>
        </LoadingProvider>
    );
}

export default App;
