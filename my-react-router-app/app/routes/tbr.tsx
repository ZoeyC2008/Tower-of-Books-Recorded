import {useState, useEffect} from "react";
import type {Book} from "~/types/book";
import BookCard from "~/components/bookcard";
import "~/app.css"

type ShelfView = "all" | "tbr" | "read";

export default function TBR() {
    const [books, setBooks] = useState<Book[]>([]);
    const [view, setView] = useState<ShelfView>("all");

    useEffect(() => {
        fetch(`http://localhost:8080/api/shelves/${view}`)
            .then(res => res.json())
            .then(data => setBooks(data));
    }, [view]);

    const addTBR = async (book: Book) => {
        try {
            await fetch(`http://localhost:8080/api/shelves/tbr`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book),
            });
            setBooks(prev => prev.map(b =>
                b.id === book.id ? { ...b, shelf: "tbr" } : b
            ));
        } catch (err) {
            console.error("Failed to add to TBR", err);
        }
    };

    const moveToRead = async (id: number) => {
        try {
            await fetch(`http://localhost:8080/api/shelves/tbr/${id}/move-to-read`, {
                method: "POST",
            });
            setBooks(prev => prev.map(b =>
                b.id === id ? { ...b, shelf: "read" } : b
            ));
        } catch (err) {
            console.error("Failed to move to read", err);
        }
    };

    const remove = async (id: number) => {
        const book = books.find(b => b.id === id);
        if (!book?.shelf) return;
        await fetch(`http://localhost:8080/api/shelves/${book.shelf}/${id}`, {
            method: "DELETE",
        });
        setBooks(prev => prev.filter(b => b.id !== id));
    };

    const tabs: { label: string; value: ShelfView }[] = [
        { label: "All", value: "all" },
        { label: "TBR", value: "tbr" },
        { label: "Read", value: "read" },
    ];

    return (
        <div style={{
            //maxWidth: "720px",
            margin: "0 auto",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
        }}>
            <div style={{
                display: "flex",
                gap: "0.5rem",
                backgroundColor: "#fdf6ec",
                borderRadius: "8px",
                width: "fit-content",
                alignSelf: "center",
                border: "2px solid #b87d11",
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.value}
                        onClick={() => setView(tab.value)}
                        style={{
                            padding: "0.35rem 1rem",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "1rem",
                            fontWeight: 500,
                            transition: "background-color 0.15s, color 0.15s",
                            backgroundColor: view === tab.value ? "#ffe0b4" : "transparent",
                            color: view === tab.value ? "#5c3d1e" : "#b87d11",
                            border: "none",
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                width: "100%",
            }}>
                {books.length === 0 ? (
                    <p style={{ color: "#b87d11", fontSize: "0.95rem", margin: 0 }}>
                        Nothing here yet.
                    </p>
                ) : (
                    books.map(book => (
                        <BookCard
                            key={book.id}
                            book={book}
                            shelf={book.shelf as "tbr" | "read" | undefined}
                            onAddTBR={addTBR}
                            onMoveToRead={moveToRead}
                            onRemove={remove}
                        />
                    ))
                )}
            </div>
        </div>
    );
}