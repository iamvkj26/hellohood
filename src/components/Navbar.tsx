import { NavLink } from "react-router";

const Navbar = () => (
    <nav className="navbar">
        <div className="container-fluid d-flex justify-content-between align-items-center">
            <NavLink className="navbar-brand hello-hood" to="/">
                HelloHood
            </NavLink>
            <div className="d-flex align-items-center gap-2">
                <NavLink className="text-items text-decoration-none text-light" to="/aboutUs">
                    About Us
                </NavLink>
                <NavLink className="text-items text-decoration-none text-light" to="/query">
                    Query
                </NavLink>
            </div>
        </div>
    </nav>
);

export default Navbar;