package tbr.concept;

import java.util.*;

public class Shelf {
    ArrayList<Book> books;

    public Shelf(){
        books = new ArrayList<Book>();
    }

    public void add(Book book){
        if (books.contains(book)) {
            return;
        }
        books.add(book);
    }

    public void remove(Book book){
        if (books.contains(book)){
            books.remove(book);
        }
    }

    public Book getBook(int index){
        return books.get(index);
    }

    public boolean contains(Book book){
        return books.contains(book);
    }
}
