import {useState, useEffect} from "react";
import type {Book} from "~/types/book";
import BookCard from "~/components/bookcard";

export default function TBR() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/shelves/all")
            .then(res => res.json())
            .then(data => setBooks(data));
    }, []);

    return (



        <div>
            <p>library totally exists (i'm so sorry)</p>

            <div>
                {books.map(book => (
                    <BookCard
                        key={book.id}
                        book={book}
                        //onAddTBR={addTBR}
                    />
                ))}

            </div>
        </div>
    )
}