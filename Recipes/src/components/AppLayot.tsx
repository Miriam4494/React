import { useContext } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router";
import { UserContext } from "../AppProvider";
const AppLayout = () => {
    const [user] = useContext(UserContext);
    return (
        <>
            <nav
                style={{
                    position: "absolute",
                    top: "25px",
                    right: "25px",
                    display: "flex",
                    gap: "10px",
                    backgroundColor: "#e9ecef",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Link to="/" style={{ color: '#000000', textDecoration: 'none' }}>Home</Link>|
                <Link to="/about" style={{ color: '#000000', textDecoration: 'none' }}>About</Link>|
                <Link to="/recipes" style={{ color: '#000000', textDecoration: 'none' }}>Recipes</Link>
                {user.id != null && (
                    <>|<Link to="/addRecipe" style={{ color: '#000000', textDecoration: 'none' }}>Add Recipe</Link></>
                )}
            </nav>
            <Outlet />
        </>
    );
};

export default AppLayout;


