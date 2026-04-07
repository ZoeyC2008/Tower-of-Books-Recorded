import {useState} from 'react'
import type {Book} from "~/types/book";
import BookCard from "~/components/bookcard";


export default function Search() {
    //const [count, setCount] = useState(0)
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState<Book[]>([]);

    const search = async () => {
        const res = await fetch(`http://localhost:8080/api/hardcover/search?q=${query}`);
        const data: Book[] = await res.json();
        const merged = await fetchShelfStatus(data);
        setBooks(merged);
    };


    const fetchShelfStatus = async (searchResults: Book[]): Promise<Book[]> => {
        const res = await fetch("http://localhost:8080/api/shelves/all");
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
            await fetch(`http://localhost:8080/api/shelves/tbr`, {
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
        // remove from local state immediately
        setBooks(prev => prev.filter(b => b.id !== id));
    };

    return (
        <div>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && search()}
                placeholder="Search books..."
            />
            <button onClick={search}>Search</button>

            <div>
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