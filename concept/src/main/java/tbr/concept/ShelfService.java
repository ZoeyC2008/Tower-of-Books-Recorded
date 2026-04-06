package tbr.concept;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public class ShelfService {
    private final Shelf TBR = new Shelf();
    private final Shelf READ = new Shelf();

    public ShelfService(){}

    @Autowired
    private BookService bookService;

    public void addTBR(int id) throws Exception {
        if (!TBR.containsId(id)) {
            Book book = bookService.getBookById(id);
            TBR.add(book);
        }
    }

    public void addREAD(int id) throws Exception {
        if (!READ.containsId(id)) {
            Book book = bookService.getBookById(id);
            READ.add(book);
        }
    }

    public void moveToRead(int id) {
        Book book = TBR.getBookById(id); // get it before removing
        if (book != null) {
            TBR.remove(id);
            READ.add(book);
        }
    }



    public void removeTBR(@RequestParam int book){
        TBR.remove(book);
    }

    public void removeRead(@RequestParam int book){
        READ.remove(book);
    }

    public Book[] getTBR(){
        return TBR.getBooks();
    }

    public Book[] getREAD(){
        return READ.getBooks();
    }
}
