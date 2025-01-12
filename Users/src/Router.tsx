import Home  from "./components/Home";
import About from "./components/About";
import AppLayout from "./components/AppLayot";
import { createBrowserRouter } from "react-router"

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: 'about', element: <About /> }
        ]
    }
])