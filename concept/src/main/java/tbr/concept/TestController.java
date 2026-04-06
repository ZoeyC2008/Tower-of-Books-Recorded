package tbr.concept;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class TestController {

    @Autowired
    private BookService bookService;

    @Autowired
    private ShelfService shelfService;

    @GetMapping("/test")
    public String test() {
        return "Spring boot and react are linked up, i swear tests work";
    }

    //Wrapper wrapper = new Wrapper();
    @GetMapping("/hardcover/test")
    public Book[] searchBooks() throws Exception{
        return bookService.searchBooks("a wizard of earthsea");
    }

    @GetMapping("/hardcover/search")
    public Book[] searchBooks(@RequestParam String q) throws Exception{
        return bookService.searchBooks(q);
    }

    @GetMapping("/shelves/tbr")
    public Book[] getTBRBooks()  {
        return shelfService.getTBR();
    }

    @GetMapping("/shelves/read")
    public Book[] getReadBooks()  {
        return shelfService.getREAD();
    }

    @GetMapping("/shelves/all")
    public Book[] getAllBooks()  {
        return shelfService.getCombined();
    }

    @PostMapping("/shelves/tbr")
    public void addTBR(@RequestBody Book book) {
        System.out.println("Received book: " + book);
        shelfService.addTBR(book);
    }

    @PostMapping("/shelves/tbr/{id}/move-to-read")
    public void moveToRead(@PathVariable int id) {
        shelfService.moveToRead(id);
    }

    @DeleteMapping("/shelves/tbr/{id}")
    public void removeTBR(@PathVariable int id) {
        shelfService.removeTBR(id);
    }

    @DeleteMapping("/shelves/read/{id}")
    public void removeRead(@PathVariable int id) {
        shelfService.removeRead(id);
    }
}
