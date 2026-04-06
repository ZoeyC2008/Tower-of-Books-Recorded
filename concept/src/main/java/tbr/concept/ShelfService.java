package tbr.concept;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@Service
public class ShelfService {
    private final Shelf TBR = new Shelf("tbr");
    private final Shelf READ = new Shelf("read");

    public ShelfService() {
    }

    @Autowired
    private BookService bookService;


    public void addTBR(int id) throws Exception {
        if (!TBR.containsId(id)) {
            Book book = bookService.getBookById(id);
            TBR.add(book);
        }
    }

    public void addTBR(Book book) {
        if (!TBR.containsId(book.getId())) {
            TBR.add(book);
            book.setShelfName("tbr");
        }
    }

    public void addREAD(int id) throws Exception {
        if (!READ.containsId(id)) {
            Book book = bookService.getBookById(id);
            READ.add(book);
            book.setShelfName("read");
        }
    }

    public void moveToRead(int id) {
        Book book = TBR.getBookById(id); // get it before removing
        if (book != null) {
            TBR.remove(id);
            READ.add(book);
            book.setShelfName("read");
        }
    }


    public void removeTBR(@RequestParam int id) {
        Book book = TBR.getBookById(id);
        if (book != null) {
            TBR.remove(id);
            book.setShelfName(null);
        }
    }

    public void removeRead(@RequestParam int id) {
        Book book = READ.getBookById(id);
        if (book != null) {
            READ.remove(id);
            book.setShelfName(null);
        }
    }

    public Book[] getTBR() {
        return TBR.getBooks();
    }

    public Book[] getREAD() {
        return READ.getBooks();
    }

    public Book[] getCombined() {
        //int booksLen = TBR.getBooks().length + READ.getBooks().length;
        ArrayList<Book> books = new ArrayList<Book>();

        books.addAll(Arrays.asList(TBR.getBooks()));
        books.addAll(Arrays.asList(READ.getBooks()));
        books.sort(Comparator.comparing(book -> {
            String[] authors = book.getAuthors();
            if (authors == null || authors.length == 0) return "";
            String author = authors[0];
            String[] parts = author.split(" ");
            return parts[parts.length - 1];
        }));

        Book[] returnBooks = new Book[books.size()];
        books.toArray(returnBooks);

        return returnBooks;
    }
}
