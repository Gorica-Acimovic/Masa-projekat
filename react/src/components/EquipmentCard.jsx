import { useNavigate } from "react-router-dom";

const STATE_STYLES = {
    Available: { label: "Dostupno", className: "chip-success" },
    Damaged: { label: "Oštećeno", className: "chip-danger" },
    WrittenOff: { label: "Otpisano", className: "chip-neutral" },
};

export default function EquipmentCard({ item }) {
    const navigate = useNavigate();
    const state = item.equipment_state?.name
        ? STATE_STYLES[item.equipment_state.name] || {
              label: item.equipment_state.name,
              className: "chip-neutral",
          }
        : null;
    const meta = [item.brand, item.model].filter(Boolean).join(" · ");

    return (
        <div
            className="equipment-card"
            onClick={() =>
                navigate(`/equipment/${item.id}`, { state: { item } })
            }
        >
            <div className="equipment-card-media">
                {item.imageurl ? (
                    <img
                        src={`http://localhost:8000/storage/${item.imageurl}`}
                        alt={item.name}
                    />
                ) : (
                    <div className="equipment-card-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>
                    </div>
                )}
                {state && (
                    <span className={`chip ${state.className} equipment-card-chip`}>
                        {state.label}
                    </span>
                )}
            </div>

            <div className="equipment-card-body">
                {item.equipment_type?.name && (
                    <div className="equipment-card-eyebrow">{item.equipment_type.name}</div>
                )}
                <h3 className="equipment-card-title">{item.name}</h3>
                <p className="equipment-card-meta">{meta || " "}</p>
                <div className="equipment-card-footer">
                    <span className="equipment-card-price">
                        {Number(item.price).toFixed(2)} KM<span> / dan</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
