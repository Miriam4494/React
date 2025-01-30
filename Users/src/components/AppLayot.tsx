import { useContext } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router";
import { userContext } from "../App";

const style = {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
}
const AppLayout = () => {
    const [user, userDispatch] = useContext(userContext);
    return (
        <>
            <nav
                style={{
                    position: "absolute",
                    top: "25px",
                    right: "25px",
                    display: "flex",
                    gap: "10px",
                    backgroundColor: "#e9ecef", // גוון אפור בהיר
                    padding: "10px 15px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // צל קל
                }}
            >
                <Link to="/" style={{ color: '#000000', textDecoration: 'none' }}>Home</Link>|
                <Link to="/recipe" style={{ color: '#000000', textDecoration: 'none' }}>Recipes</Link>
                {user.id != null && (
                    <>|<Link to="/addRecipe" style={{ color: '#000000', textDecoration: 'none' }}>Add Recipe</Link></>
                )}
            </nav>
    
            <Outlet />
        </>
    );
    
    
};

export default AppLayout;


