package tbr.concept;

import java.util.*;

public class Shelf {
    ArrayList<Book> books;

    public Shelf() {
        books = new ArrayList<Book>();
    }

    public void add(Book book) {
        int id = book.getId();

        for (int i = 0; i < books.size(); i++) {
            if (books.get(i).getId() == id) {
                return;
            }
        }

        books.add(book);
    }

//    public void add(int id){
//        for (int i = 0; i < books.size(); i++) {
//            if (books.get(i).getId() == id) {
//                return;
//            }
//        }
//
//        books.add(new Book(id));
//
//        System.out.println(Arrays.toString(books.toArray()));
//    }

    public void remove(Book book) {
        int id = book.getId();
        int index = -1;

        for (int i = 0; i < books.size(); i++) {
            if (books.get(i).getId() == id) {
                index = i;
            }
        }

        if (index != -1) {
            books.remove(index);
        }
    }

    public void remove(int id){
        int index = -1;

        for (int i = 0; i < books.size(); i++) {
            if (books.get(i).getId() == id) {
                index = i;
            }
        }

        if (index != -1) {
            books.remove(index);
        }
    }

    public boolean containsId(int id) {
        for (int i = 0; i < books.size(); i++) {
            if (books.get(i).getId() == id) return true;
        }
        return false;
    }

    public Book[] getBooks(){
        Book[] returnArray = new Book[books.size()];
        for (int i = 0; i < books.size(); i++) {
            returnArray[i] = books.get(i);
        }
        return returnArray;
    }

    public Book getBook(int index) {
        return books.get(index);
    }

    public Book getBookById(int id) {
        for (int i = 0; i < books.size(); i++) {
            if (books.get(i).getId() == id) {
                return books.get(i);
            }
        }

        return null;
    }

    public boolean contains(Book book) {
        return books.contains(book);
    }
}
