import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import LogIn from "../pages/authentication/LogIn";
import Register from "../pages/authentication/Register";
import ErrorPage from "../pages/errorPage/ErrorPage";
import PrivateRoutes from '../routes/PrivateRoutes'
import Home from "../pages/home/Home";
import ProductDetails from "../pages/detailsPage/ProductDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/product-details/:id",
                element: <PrivateRoutes><ProductDetails /></PrivateRoutes>,
                loader: () => fetch(`${import.meta.env.VITE_LOCAL_API_URL}/products`),
            },
            {
                path: "/login",
                element: <LogIn />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
]);

export default router;