import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../index.css";
import Navbar from "../contexts/NavBar.jsx";
import cartIcon from "../icons/basket.png";
import userIcon from "../icons/user2.png";
import * as bootstrap from "bootstrap";
import axiosClient from "../axios-client";
import { useState, useEffect } from "react";

export default function DefaultLayout() {
    const {token, setToken} = useStateContext();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll(
            '[data-bs-toggle="tooltip"]'
        );

        const tooltips = [...tooltipTriggerList].map(
            el => new bootstrap.Tooltip(el)
        );

        return () => {
            tooltips.forEach(t => t.dispose());
        };
    }, [token]);

    const onLogout = () => {
        axiosClient.post("/logout")
            .finally(() => {
                setToken(null);
                navigate("/dashboard");
            });
    };

    return (
        <div id="defaultLayout">
            <aside>
                <div className="rail-brand">
                    <div className="rail-brand-mark">
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg>
                    </div>
                    <div>
                        <div className="rail-brand-text">SportRent</div>
                        <div className="rail-brand-sub">Iznajmljivanje opreme</div>
                    </div>
                </div>

                <NavLink to="/dashboard">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>
                    Dashboard
                </NavLink>

                {token && (
                    <NavLink to="/additems">
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                        Dodavanje opreme
                    </NavLink>
                )}

                <NavLink to="/sports">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>
                    Sportovi
                </NavLink>
                <NavLink to="/adults">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7.5" r="3.5"/><path d="M4.5 20c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5"/></svg>
                    Odrasli
                </NavLink>
                <NavLink to="/kids">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8.5" r="2.8"/><path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>
                    Djeca
                </NavLink>

            </aside>

            <div className="content">
                <header>
                    <div id="headerDiv">
                        <div>
                            {token
                                ? "Dobrodošli!"
                                : "Dobrodošli! Ukoliko nemate nalog, nije moguće izvršiti narudžbu!"}
                        </div>

                        <div id="iconsDiv">
                            <Link to={token ? "/profile" : "/signup"}>
                                <img
                                    src={userIcon}
                                    alt="User"
                                    style={{
                                        width: "30px",
                                        cursor: "pointer"
                                    }}
                                    data-bs-toggle="tooltip"
                                    data-bs-title={
                                        token
                                            ? "Moj profil"
                                            : "Kreiraj nalog / Prijavi se"
                                    }
                                />
                            </Link>

                            <img
                                src={cartIcon}
                                alt="Shopping Cart"
                                style={{
                                    width: "30px",
                                    cursor: "pointer"
                                }}
                                data-bs-toggle="tooltip"
                                data-bs-title="Korpa"
                                onClick={() => navigate("/basket")}
                            />

                            {token && (
                                <button
                                    className="btn btn-outline-danger btn-sm ms-2"
                                    onClick={onLogout}
                                >
                                    Odjava
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                <Navbar/>
                <main>
                    <Outlet context={{ search }} />
                </main>
            </div>
        </div>
    );
}
