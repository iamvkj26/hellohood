import { Link } from "react-router";

const Navbar = () => (
    <nav className="navbar">
        <div className="container-fluid d-flex justify-content-between align-items-center">
            <Link className="navbar-brand hello-hood" to="/">
                HelloHood
            </Link>
            <div className="d-flex align-items-center gap-2">
                <Link className="text-items text-decoration-none text-light" to="/aboutUs">
                    About Us
                </Link>
                <Link className="text-items text-decoration-none text-light" to="/contactUs">
                    Contact Us
                </Link>
            </div>
        </div>
    </nav>
);

export default Navbar;