import { Outlet } from "react-router";
import { Link } from "react-router";

const style = {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
}
const AppLayout = () => {
    return (
        <>
            <nav
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    display: "flex",
                    gap: "10px",
                    backgroundColor: "#f8f9fa",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Link to="/" style={style}>Home</Link>|
                <Link to="/about" style={style}>About</Link>
            </nav>
            <Outlet />
        </>
    );
};

export default AppLayout;



