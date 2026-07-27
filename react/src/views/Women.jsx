import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Women() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        params.set("age", "8");

        navigate(`/equipment?${params.toString()}`, {
            replace: true,
        });
    }, [navigate, location.search]);

    return null;
}
