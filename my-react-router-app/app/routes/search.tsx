import {useState} from 'react'
import type {Book} from "~/types/book";
import BookCard from "~/components/bookcard";


export default function Search() {
    //const [count, setCount] = useState(0)
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState<Book[]>([]);

    const search = async () => {
        const res = await fetch(`http://localhost:8080/api/hardcover/search?q=${query}`);
        const data = await res.json();
        setBooks(data);
    };
    const addTBR = async (book: Book) => {
        try {
            await fetch(`http://localhost:8080/api/shelves/tbr`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book),
            });
            console.log("Added to TBR:", book.id);
        } catch (err) {
            console.error("Failed to add to TBR", err);
        }
    };

    return (
        <div>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books..."
            />
            <button onClick={search}>Search</button>

            <div>
                {books.map(book => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onAddTBR={addTBR}
                    />
                ))}

            </div>
        </div>
    );
}