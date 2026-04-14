package tbr.concept;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public class BookService {
    @Autowired
    private Wrapper wrapper;

    public BookService() {
    }

    public Book[] searchBooks(@RequestParam String q) throws Exception {
        return wrapper.searchBookReturnArray(q);
    }

    public Book getBookById(@RequestParam int id) throws Exception {
        return wrapper.getBookByID(id);
    }
}
