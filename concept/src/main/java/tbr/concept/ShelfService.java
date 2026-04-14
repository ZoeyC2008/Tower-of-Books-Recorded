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

    private final ShelfRepository shelfRepository;
    private final BookRepository bookRepository;

    @Autowired
    private BookService bookService;

    public ShelfService(ShelfRepository shelfRepository, BookRepository bookRepository) {
        this.shelfRepository = shelfRepository;
        this.bookRepository = bookRepository;

        // Only create shelves if they don't already exist
        if (shelfRepository.findByName("tbr").isEmpty()) shelfRepository.save(new Shelf("tbr"));
        if (shelfRepository.findByName("read").isEmpty()) shelfRepository.save(new Shelf("read"));
    }

    public Shelf getOrCreateShelf(String name) {
        return shelfRepository.findByName(name)
                .orElseGet(() -> shelfRepository.save(new Shelf(name)));
    }

    public void addTBR(int id) throws Exception {
        Shelf tbr = getOrCreateShelf("tbr");
        if (!tbr.containsId(id)) {
            Book book = bookService.getBookById(id);
            tbr.add(book);
            shelfRepository.save(tbr);
        }
    }

    public void addTBR(Book book) {
        Shelf tbr = getOrCreateShelf("tbr");
        if (!tbr.containsId(book.getId())) {
            tbr.add(book);
            shelfRepository.save(tbr);
        }
    }

    public void addREAD(int id) throws Exception {
        Shelf read = getOrCreateShelf("read");
        if (!read.containsId(id)) {
            Book book = bookService.getBookById(id);
            read.add(book);
            shelfRepository.save(read);
        }
    }

    public void moveToRead(int id) {
        Shelf tbr = getOrCreateShelf("tbr");
        Shelf read = getOrCreateShelf("read");
        Book book = tbr.getBookById(id);
        if (book != null) {
            tbr.remove(id);
            read.add(book);
            shelfRepository.save(tbr);
            shelfRepository.save(read);
        }
    }

    public void removeTBR(int id) {
        Shelf tbr = getOrCreateShelf("tbr");
        tbr.remove(id);
        shelfRepository.save(tbr);
    }

    public void removeRead(int id) {
        Shelf read = getOrCreateShelf("read");
        read.remove(id);
        shelfRepository.save(read);
    }

    public Book[] getTBR() {
        return getOrCreateShelf("tbr").getBooks();
    }

    public Book[] getREAD() {
        return getOrCreateShelf("read").getBooks();
    }

    public Book[] getCombined() {
        ArrayList<Book> books = new ArrayList<>();
        books.addAll(Arrays.asList(getTBR()));
        books.addAll(Arrays.asList(getREAD()));
        books.sort(Comparator.comparing(book -> {
            String[] authors = book.getAuthors();
            if (authors == null || authors.length == 0) return "";
            String[] parts = authors[0].split(" ");
            return parts[parts.length - 1];
        }));
        return books.toArray(new Book[0]);
    }
}