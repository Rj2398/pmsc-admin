import React, { useState } from "react";
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";

function Layout() {

    const [showSidebar, setShowSidebar] = useState(true);
    return (
        <>
            <SideBar showSidebar={showSidebar}  />
            <section id="content">
                <Navbar  setShowSidebar={setShowSidebar}/>
                <main>
                    <Outlet />
                </main>
            </section>

        </>
    )
}


export default Layout;