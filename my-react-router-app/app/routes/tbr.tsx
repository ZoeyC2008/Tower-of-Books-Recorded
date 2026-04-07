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
            <p>library totally exists (i'm so sorry)</p>

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
    )
}