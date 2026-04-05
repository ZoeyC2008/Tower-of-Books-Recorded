package tbr.concept;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class TestController {

    @GetMapping("/test")
    public String test() {
        return "Spring boot and react are linked up, i swear tests work";
    }

    Wrapper wrapper = new Wrapper();
    @GetMapping("/hardcover")
    public String hardcover() throws Exception{
        return wrapper.searchBook("a wizard of earthsea");
    }

}
