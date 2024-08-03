import { useTheme } from "@mui/material";
import Footer from "./Footer";
import Navbar from "./NavBar";
import SideBar from "./SideBar";
interface MainLayoutProp {
    children: React.ReactNode
}
const MainLayout: React.FC<MainLayoutProp> = ({ children }) => {

    return (
        <>
            <Navbar />
            <div className="tw-flex tw-width-100">
                <SideBar />
                <div className="container">
                {children}
                </div>
            </div>
            <Footer />
        </>

    )
}
export default MainLayout;