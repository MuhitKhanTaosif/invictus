import { Outlet } from "react-router";
//Components
import Sidebar from "../components/Sidebar";


//This layout is only for admin
export default function AdminView() {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <main className="flex-1 ml-64 overflow-y-auto">
                <div className="min-h-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
