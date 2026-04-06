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
    public Book[] searchShelves() {
        return shelfService.getTBR();
    }

    @PostMapping("/shelves/tbr/{id}")
    public void addTBR(@PathVariable int id) throws  Exception{
        shelfService.addTBR(id);
        System.out.println(id);
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
