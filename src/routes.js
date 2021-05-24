import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";


var routes = [
    {
        path: "/",
        name: "Landing",
        component: Home,
        layout: "/",
    },
    {
        path: "login",
        name: "User Login",
        component: Login,
        layout: "/",
    },
    {
        path: "",
        name: "User Dashboard",
        component: Dashboard,
        layout: "/user",
    }
]

export default routes;