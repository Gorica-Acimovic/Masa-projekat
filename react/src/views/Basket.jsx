import {useEffect, useState} from "react";
import {useBasket} from "../contexts/BasketContext.jsx";
import axiosClient from "../axios-client.js";
import BasketItemCard from "../components/BasketItemCard.jsx";

export default function Basket() {
    const [items, setItems] = useState([]);
    const { basket, removeFromBasket, clearBasket } = useBasket();
    const [reservation, setReservation] = useState({
        startDate: "", endDate: "", name: "", surname: "", contact: "", personalDocument: ""
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {

        if (basket.length === 0) {
            setItems([]);
            return;
        }
        console.log("Basket IDs:", basket);
        axiosClient.post("/basket", { ids: basket })
            .then(({ data }) => {
                console.log("Returned items:", data);
                setItems(data);
            })
            .catch(console.error);
    }, [basket]);

    const removeItem = (id) => {
        removeFromBasket(id);
    };
    const totalPrice = items.reduce((sum, item) => sum + Number(item.price), 0);
    const handleChange = (e) => {
        setReservation({
            ...reservation, [e.target.name]: e.target.value
        });
    };
    const handleReserve = async () => {
        if (items.length === 0) {
            alert("Korpa je prazna.");
            return;
        }

        const payload = {
            reservation_date: reservation.startDate,
            return_date: reservation.endDate,
            name: reservation.name,
            surname: reservation.surname,
            phone: reservation.contact,
            identification_document: reservation.personalDocument || null,
            equipment_item_ids: items.map(item => item.id)
        };

        setSubmitting(true);
        try {
            await axiosClient.post("/reservations", payload);
            alert("Rezervacija je uspješno kreirana!");
            clearBasket();
            setReservation({
                startDate: "", endDate: "", name: "", surname: "", contact: "", personalDocument: ""
            });
        } catch (error) {
            console.log(error.response?.data);
            const message = error.response?.data?.message || "Greška prilikom kreiranja rezervacije.";
            alert(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (<div className="container mt-4">
            <h2 className="mb-4">
                Basket
            </h2>
            {items.map(item => (<BasketItemCard
                    key={item.id}
                    item={item}
                    onRemove={removeItem}
                />))}
            <div className="card mt-4">
                <div className="card-header">
                    Reservation Information
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Start date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="startDate"
                                value={reservation.startDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>End date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="endDate"
                                value={reservation.endDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={reservation.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Surname</label>
                            <input
                                type="text"
                                className="form-control"
                                name="surname"
                                value={reservation.surname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Contact</label>
                            <input
                                type="text"
                                className="form-control"
                                name="contact"
                                value={reservation.contact}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Personal document</label>
                            <input
                                type="text"
                                className="form-control"
                                name="personalDocument"
                                value={reservation.personalDocument}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <hr/>
                    <h4>Total price: {totalPrice} KM</h4>
                    <button
                        className="btn btn-success mt-3"
                        onClick={handleReserve}
                        disabled={submitting}
                    >
                        {submitting ? "Slanje..." : "Reserve"}
                    </button>
                </div>
            </div>
        </div>);
}
