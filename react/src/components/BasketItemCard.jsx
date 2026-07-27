export default function BasketItemCard({item, onRemove}) {
    const meta = [
        item.equipment_type?.sport?.name,
        item.size && `Veličina ${item.size}`,
    ].filter(Boolean).join(" · ");

    return (
        <div className="basket-item">
            <div className="basket-item-media">
                {item.imageurl ? (
                    <img
                        src={`http://localhost:8000/storage/${item.imageurl}`}
                        alt={item.name}
                    />
                ) : (
                    <div className="basket-item-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>
                    </div>
                )}
            </div>

            <div className="basket-item-info">
                <div className="basket-item-name">{item.name}</div>
                {meta && <div className="basket-item-meta">{meta}</div>}
            </div>

            <div className="basket-item-price">{Number(item.price).toFixed(2)} KM</div>

            <button
                className="basket-item-remove"
                onClick={() => onRemove(item.id)}
                aria-label="Ukloni iz korpe"
            >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
        </div>
    );
}
