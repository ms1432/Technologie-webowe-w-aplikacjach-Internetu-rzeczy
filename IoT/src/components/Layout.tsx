import { Outlet } from 'react-router-dom';
import '../App.css'

import Navbar from '../components/Navbar'

function Layout() {

    return (
        <>
            <div style={{ minHeight: '100vh', display: "flex", flexDirection: "column"}}>
                <Navbar />
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <Outlet />
                </div>
            </div>
        </>

    )
}

export default Layout;