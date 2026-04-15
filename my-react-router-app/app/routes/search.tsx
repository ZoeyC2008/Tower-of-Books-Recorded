import {useState} from 'react'
import type {Book} from "~/types/book";
import BookCard from "~/components/bookcard";
import "~/app.css"


export default function Search() {
    //const [count, setCount] = useState(0)
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState<Book[]>([]);

    const search = async () => {
        const res = await fetch(`https://tower-of-books-recorded.onrender.com/api/hardcover/search?q=${query}`);
        const data: Book[] = await res.json();
        const merged = await fetchShelfStatus(data);
        setBooks(merged);
    };


    const fetchShelfStatus = async (searchResults: Book[]): Promise<Book[]> => {
        const res = await fetch("https://tower-of-books-recorded.onrender.com/api/shelves/all");
        const shelfBooks: Book[] = await res.json();

        // build a quick id -> shelf lookup
        const shelfMap = new Map<number, "tbr" | "read">();
        shelfBooks.forEach(b => {
            if (b.shelf) shelfMap.set(b.id, b.shelf);
        });

        // merge shelf status into search results
        return searchResults.map(b => ({
            ...b,
            shelf: shelfMap.get(b.id),
        }));
    };

    const addTBR = async (book: Book) => {
        try {
            await fetch(`https://tower-of-books-recorded.onrender.com/api/shelves/tbr`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book),
            });
            setBooks(prev => prev.map(b =>
                b.id === book.id ? { ...b, shelf: "tbr" } : b
            ));
            console.log("Added to TBR:", book.id);
        } catch (err) {
            console.error("Failed to add to TBR", err);
        }
    };


    const moveToRead = async (id: number) => {
        try {
            await fetch(`https://tower-of-books-recorded.onrender.com/api/shelves/tbr/${id}/move-to-read`, {
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
        await fetch(`https://tower-of-books-recorded.onrender.com/api/shelves/${book.shelf}/${id}`, {
            method: "DELETE",
        });
        // remove from local state immediately
        setBooks(prev => prev.map(b =>
            b.id === id ? { ...b, shelf: "" } : b
        ));
        //setBooks(prev => prev.filter(b => b.id !== id));
    };

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                padding: "1.5rem",
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#fdf6ec",
                    border: "2px solid #b87d11",
                    borderRadius: "8px",
                    padding: "0.4rem 0.75rem",
                    gap: "0.5rem",
                    width: "100%",
                }}>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && search()}
                        placeholder="Search books..."
                        style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            backgroundColor: "transparent",
                            fontSize: "1rem",
                            color: "#b87d11",
                            caretColor: "#7a5230",
                        }}
                    />
                    <button
                        onClick={search}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "0.25rem",
                            display: "flex",
                            alignItems: "center",
                            opacity: 0.75,
                        }}
                        aria-label="Search"
                    >
                        <img
                            src="/images/search.svg"
                            alt="Search"
                            style={{ height: "18px", width: "18px" }}
                        />
                    </button>
                </div>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                margin: "0 auto",
                padding: "1.5rem",
            }}>
                {books.map(book => (
                    <BookCard
                        key={book.id}
                        book={book}
                        shelf={book.shelf as "tbr" | "read" | undefined}
                        onAddTBR={addTBR}
                        onMoveToRead={moveToRead}
                        onRemove={remove}
                    />
                ))}
            </div>
        </div>
    );
}