import type { Book } from "~/types/book.tsx";
import "~/app.css";
import { useState, useRef, useEffect } from "react";

type BookCardProps = {
    book: Book;
    shelf?: "tbr" | "read";
    onAddTBR?: (book: Book) => void;
    onMoveToRead?: (id: number) => void;
    onRemove?: (id: number) => void;
};

const HOLD_DURATION = 500;
const RING_DELAY = 300;
const CIRCUMFERENCE = 2 * Math.PI * 19; //

function ShelfButton({ shelf, onAddTBR, onMoveToRead, onRemove, book, onFlip }: {
    shelf?: "tbr" | "read";
    onAddTBR?: (book: Book) => void;
    onMoveToRead?: (id: number) => void;
    onRemove?: (id: number) => void;
    book: Book;
    onFlip: () => void;
}) {
    const [progress, setProgress] = useState(0); // 0–1
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const didLongPress = useRef(false);

    // derive button appearance from shelf
    const isRemoveMode = false; // handled by parent flip state
    const bg = shelf === "tbr" ? "#a2cffe"
        : shelf === "read" ? "#98dd98"
            : "transparent";
    const borderColor = shelf === "tbr" ? "#3a7bd5"
        : shelf === "read" ? "#3d9e5e"
            : "#c8a87a";
    const ringColor = shelf === "tbr" ? "#3a7bd5"
        : shelf === "read" ? "#3d9e5e"
            : "#c8a87a";

    const [holding, setHolding] = useState(false);
    const ringDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startHold = () => {
        didLongPress.current = false;

        ringDelayRef.current = setTimeout(() => {
            setHolding(true); // ring appears after delay
        }, RING_DELAY);

        timerRef.current = setTimeout(() => {
            didLongPress.current = true;
            setHolding(false);
            onFlip();
        }, HOLD_DURATION);
    };

    const cancelHold = () => {
        if (ringDelayRef.current) clearTimeout(ringDelayRef.current);
        if (timerRef.current) clearTimeout(timerRef.current);
        setHolding(false);
    };


    const cleanup = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    const handleClick = () => {
        if (didLongPress.current) return;
        if (!shelf) onAddTBR?.(book);
        else if (shelf === "tbr") onMoveToRead?.(book.id);
        // read = do nothing
    };

    useEffect(() => () => cleanup(), []);

    const strokeOffset = CIRCUMFERENCE * (1 - progress);

    return (
        <button
            onMouseDown={startHold}
            onMouseUp={() => { cancelHold(); }}
            onMouseLeave={cancelHold}
            onTouchStart={startHold}
            onTouchEnd={() => { cancelHold(); }}
            onTouchCancel={cancelHold}
            onClick={handleClick}
            style={{
                width: 38, height: 38, borderRadius: "50%",
                background: bg, border: `2px solid ${borderColor}`,
                cursor: shelf === "read" ? "default" : "pointer",
                flexShrink: 0, position: "relative",
                padding: 0, display: "flex", alignItems: "center", justifyContent: "center",
            }}
        >
            {/* hold progress ring */}
            <svg
                width="38" height="38"
                style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)", transformOrigin: "19px 19px", pointerEvents: "none", margin: "auto", }}
                viewBox="0 0 38 38"
            >
                <circle
                    cx="19" cy="19" r="17"
                    fill="none"
                    stroke={ringColor}
                    strokeWidth="3.5"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={CIRCUMFERENCE}
                    style={holding ? {
                        animation: `fillRing ${HOLD_DURATION - RING_DELAY}ms linear forwards`
                    } : {}}
                />
            </svg>
        </button>
    );
}

function RemoveButton({ onRemove, bookId, onFlip }: {
    onRemove?: (id: number) => void;
    bookId: number;
    onFlip: () => void;
}) {
    const [holding, setHolding] = useState(false);
    const [progress, setProgress] = useState(0);
    const ringDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const didLongPress = useRef(false);

    const startHold = () => {
        didLongPress.current = false;
        ringDelayRef.current = setTimeout(() => setHolding(true), RING_DELAY);
        timerRef.current = setTimeout(() => {
            didLongPress.current = true;
            setHolding(false);
            onFlip();
        }, HOLD_DURATION);
    };

    const cancelHold = () => {
        if (ringDelayRef.current) clearTimeout(ringDelayRef.current);
        if (timerRef.current) clearTimeout(timerRef.current);
        setHolding(false);
    };

    const cleanup = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    const strokeOffset = CIRCUMFERENCE * (1 - progress);

    useEffect(() => () => cleanup(), []);

    return (
        <button
            onMouseDown={startHold}
            onMouseUp={cancelHold}
            onMouseLeave={cancelHold}
            onTouchStart={startHold}
            onTouchEnd={cancelHold}
            onTouchCancel={cancelHold}
            onClick={() => onRemove?.(bookId)}
            style={{
                width: 38, height: 38, borderRadius: "50%",
                background: "#fee2e2", border: "2px solid #e05050",
                cursor: "pointer", flexShrink: 0, position: "relative",
                padding: 0, display: "flex", alignItems: "center", justifyContent: "center",
            }}
        >
            <svg
                width="38" height="38"
                style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)", transformOrigin: "19px 19px", pointerEvents: "none", margin: "auto", }}
                viewBox="0 0 38 38"
            >
                <circle
                    cx="19" cy="19" r="17"
                    fill="none"
                    stroke="#e05050"
                    strokeWidth="3.5"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={CIRCUMFERENCE}
                    style={holding ? {
                        animation: `fillRing ${HOLD_DURATION - RING_DELAY}ms linear forwards`
                    } : {}}
                />
            </svg>
        </button>
    );
}

function BookCard({ book, shelf, onAddTBR, onMoveToRead, onRemove }: BookCardProps) {
    const [expanded, setExpanded] = useState(false);
    const [flipped, setFlipped] = useState(false); // true = showing library info

    const hasExtra = !!book.description || book.contentWarnings?.length > 0;

    return (
        <div style={{
            border: "2px solid #b87d11", borderRadius: 12,
            background: "#fdf6ec", color: "#3d2e1e", overflow: "hidden",
        }}>
            <div style={{ display: "flex", alignItems: "stretch", minHeight: 120 }}>

                {/* Cover — always visible */}
                <div style={{ padding: "12px 0 12px 12px", flexShrink: 0 }}>
                    {book.coverURL ? (
                        <img
                            src={book.coverURL}
                            alt={`Cover of ${book.title}`}
                            style={{ width: 72, height: 104, borderRadius: 4, objectFit: "cover", display: "block" }}
                        />
                    ) : (
                        <div style={{
                            width: 72, height: 104, borderRadius: 4,
                            background: "#d4c0a0", display: "flex",
                            alignItems: "center", justifyContent: "center",
                            fontSize: 11, color: "#7a6147", textAlign: "center", padding: 4,
                        }}>
                            no cover
                        </div>
                    )}
                </div>

                {/* Info panel or Library panel */}
                {!flipped ? (
                    <div style={{ flex: 1, padding: "14px 12px", display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                        <div style={{ fontSize: 15, fontWeight: 500, color: "#2c1f0f", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {book.title}
                        </div>
                        <div style={{ fontSize: 13, color: "#7a6147" }}>
                            {book.authors?.join(", ") ?? "Unknown author"}
                        </div>
                        {book.featuredSeriesName && (
                            <div style={{ fontSize: 12, color: "#9e7d54", fontStyle: "italic" }}>
                                {book.featuredSeriesName} #{book.featuredSeriesPos}
                            </div>
                        )}
                        {book.genres?.length > 0 && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
                                {book.genres.map(g => (
                                    <span key={g} style={{
                                        fontSize: 11, padding: "2px 8px", borderRadius: 99,
                                        background: "#ecdec8", color: "#6b4e2a", border: "0.5px solid #c8a87a",
                                    }}>
                                        {g}
                                    </span>
                                ))}
                            </div>
                        )}
                        {hasExtra && (
                            <button
                                onClick={() => setExpanded(e => !e)}
                                style={{
                                    fontSize: 12, color: "#9e7d54", background: "none", border: "none",
                                    cursor: "pointer", padding: 0, marginTop: 6,
                                    textAlign: "left", textDecoration: "underline", fontFamily: "inherit",
                                }}
                            >
                                {expanded ? "hide description" : "show description"}
                            </button>
                        )}
                    </div>
                ) : (
                    // Library info panel
                    <div style={{ flex: 1, padding: "14px 12px", display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                        <div style={{ fontSize: 16, fontWeight: 500, color: "#7a6147", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                            Libraries Pending
                        </div>
                        {/* placeholder — replace with real API data */}
                        <div style={{ fontSize: 14, color: "#7a6147", fontWeight: 500 }}>
                            Availability checks pending
                        </div>
                    </div>
                )}

                {/* Button col */}
                <div style={{ padding: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {flipped ? (
                        <RemoveButton
                            bookId={book.id}
                            onRemove={onRemove}
                            onFlip={() => setFlipped(false)}
                        />
                    ) : (
                        <ShelfButton
                            shelf={shelf}
                            book={book}
                            onAddTBR={onAddTBR}
                            onMoveToRead={onMoveToRead}
                            onFlip={() => setFlipped(true)}
                        />
                    )}
                </div>
            </div>

            {/* Expandable section — only in normal mode */}
            {!flipped && expanded && (
                <div style={{
                    borderTop: "0.5px solid #c8b99a",
                    padding: "12px 14px 14px",
                    background: "#faf0e2",
                }}>
                    {book.description && (
                        <p style={{ fontSize: 13, color: "#3d2e1e", lineHeight: 1.65 }}>
                            {book.description}
                        </p>
                    )}
                    {book.contentWarnings?.length > 0 && (
                        <div style={{
                            marginTop: 10, fontSize: 12, color: "#a05030",
                            background: "#fbeadf", border: "0.5px solid #e0b090",
                            borderRadius: 6, padding: "6px 10px",
                        }}>
                            <div style={{ fontWeight: 500, marginBottom: 2 }}>content warnings</div>
                            {book.contentWarnings.join(", ")}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default BookCard;