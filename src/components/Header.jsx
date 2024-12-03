import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import { logout as onSignOut } from '../authMethods'
import { auth } from '../firebase';
import { useState } from "react";
import { omit } from "radash";

const Header = () => {
    const user = auth.currentUser;
    const [_, setSearchParams] = useSearchParams();
    const location = useLocation();

    const params = new URLSearchParams(location.search);

    const allParams = {};
    params.forEach((value, key) => {
        allParams[key] = value;
    });

    const handleLogout = async () => {
        try {
            await onSignOut();
            Navigate('/login');
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    };

    const [search, setSearch] = useState('');

    const handleChange = (event) => {
        setSearch(event.target.value);
        if(event.target.value) {
            if (event.key === 'Enter') {
                setSearchParams({...allParams, search: search });
            }
        } else {
            setSearchParams(omit(allParams, ['search']));
        }
    };

    return (
        <header>
            <div className="header-container">
                <div className="logo">
                    <Link to="/">
                        <h1>MOVIEQU</h1>
                    </Link>
                </div>
                {
                    user && (
                        <div className="menu">
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    Profile
                                </li>
                                <li onClick={handleLogout}>
                                    Logout
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <input type="text"
                                    value={search}
                                    onKeyDown={handleChange}
                                    onChange={handleChange}
                                    placeholder="Search" />
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>
        </header>
    )
}
export default Header
