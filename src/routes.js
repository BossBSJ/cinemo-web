import { Navigate, useRoutes } from "react-router-dom";
import { FavoritePageFromContainer, HomepageFromContainer } from "./containers/container";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

export default function Router() {
    const routes = useRoutes([
        {
            path: '/',
            element: <DashboardLayout/>,
            children: [
                {element: <Navigate to="/home"/>, index: true},
                {path: 'home' ,element: <HomepageFromContainer/>},
                {path: 'favorite', element: <FavoritePageFromContainer/>}
            ]
        },
        {
            path: '/signin',
            element: <SigninPage />,
        },
        {
            path: '/signup',
            element: <SignupPage/>
        },

    ])

    return routes
}