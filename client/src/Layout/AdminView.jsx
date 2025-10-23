import { Outlet } from "react-router";
//Components
import Sidebar from "../components/Sidebar";


//This layout is only for admin
export default function AdminView() {
    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    );
}
