import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//This layout is what the people of the internet will see.

export default function PublicView() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}
