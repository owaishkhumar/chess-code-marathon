import React from 'react'
import { Link } from 'react-router-dom'
import chess from '../images/chess2.png';

const NavBar = () => {
    return <>
        <header>
            <img src={chess} />
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/addmatch">Add Match</Link></li>
                        <li><Link to="/match">Matches</Link></li>
                        <li><Link to="/stats">Stats</Link></li>
                        <li><Link to="/aboveavergae">Average</Link></li>
                    </ul>

                </nav>
        </header>
    </>
}

export default NavBar

{/* <nav className="navbar navbar-expand-lg fixed-top navbar-scroll">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Chess</Link>
                <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addmatch">Add Match</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav> */}
