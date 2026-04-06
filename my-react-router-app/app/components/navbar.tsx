import {Link, NavLink} from "react-router";

export default function Navbar(){
    return <nav className="nav">
        <Link to="/">Home</Link>

        <ul>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/tbr">TBR</Link></li>
            <li><Link to="/card">Card</Link></li>
        </ul>

    </nav>
};