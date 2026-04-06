import {useState} from 'react'
import type {Book} from "~/types/book";


export default function Search() {
    //const [count, setCount] = useState(0)
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState<Book[]>([]);

    const search = async () => {
        const res = await fetch(`http://localhost:8080/api/hardcover/search?q=${query}`);
        const data = await res.json();
        setBooks(data);
    };
    const addTBR = async (id: number) => {
        await fetch(`http://localhost:8080/api/shelves/tbr/${id}`, {
            method: "POST",
        });
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
                {books.map((book) => (
                    <div key={book.id}>
                        <img src={book.coverURL} width={80}/>
                        <h3>{book.title}</h3>
                        <p>{book.authors.join(", ")}</p>
                        <button onClick={() => addTBR(book.id)}>
                            Add to TBR
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}