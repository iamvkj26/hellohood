import { Link } from "react-router";

const Footer = () => (
    <footer className="bg-dark border-top py-3">
        <div className="container">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div>
                    © 2026 <Link className="text-primary fw-bold" to="/">HelloHood</Link> | All Rights Reserved.
                </div>
                <div className="d-flex gap-3">
                    <Link to="/aboutUs" className="text-primary fw-bold text-decoration-none hover-white">
                        About Us
                    </Link>
                    <Link to="/query" className="text-primary fw-bold text-decoration-none hover-white">
                        Query
                    </Link>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;