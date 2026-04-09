import { Link, NavLink } from "react-router";

export default function Navbar() {
    return (
        <nav style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 2rem",
            backgroundColor: "#fdf6ec",
            borderBottom: "2px solid #b87d11",
        }}>
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                <img
                    src="/images/homelogo.svg"
                    alt="Home"
                    style={{ height: "50px", width: "auto" }}
                />
            </Link>

            <ul style={{
                display: "flex",
                gap: "0.5rem",
                listStyle: "none",
                margin: 0,
                padding: 0,
            }}>
                <li>
                    <NavLink
                        to="/search"
                        style={({ isActive }) => ({
                            padding: "0.4rem 1rem",
                            borderRadius: "6px",
                            textDecoration: "none",
                            fontSize: "1rem",
                            fontWeight: 500,
                            color: isActive ? "#5c3d1e" : "#b87d11",
                            backgroundColor: isActive ? "#ffe0b4" : "transparent",
                            transition: "background-color 0.15s, color 0.15s",
                            border: "2px solid #b87d11",
                        })}
                    >
                        Search
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/tbr"
                        style={({ isActive }) => ({
                            padding: "0.4rem 1rem",
                            borderRadius: "6px",
                            textDecoration: "none",
                            fontSize: "1rem",
                            fontWeight: 500,
                            color: isActive ? "#5c3d1e" : "#b87d11",
                            backgroundColor: isActive ? "#ffe0b4" : "transparent",
                            transition: "background-color 0.15s, color 0.15s",
                            border: "2px solid #b87d11",
                        })}
                    >
                        TBR
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}