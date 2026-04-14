package tbr.concept;

import jakarta.persistence.*;

import java.util.*;

@Entity
public class Shelf {
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "shelf_name", referencedColumnName = "name")
    private List<Book> books = new ArrayList<Book>();

    @Column(unique = true, nullable = false)
    private String name;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dbId;

    protected Shelf() {}

    public Shelf(String name) {
        books = new ArrayList<Book>();
        this.name = name;
    }


    public void sort() {
        books.sort(Comparator.comparing(book -> {
            String[] authors = book.getAuthors();
            if (authors == null || authors.length == 0) return "";
            String author = authors[0];
            String[] parts = author.split(" ");
            return parts[parts.length - 1]; // assumes the last word is the last name, edge cases include all of Asia (e.g. Cixin Liu or Liu Cixin, The Three Body Problem) and two word, non-hyphenated last names (e.g. Gabriel García Márquez, One Hundred Years of Solitude) and prefixed names (e.g. Johann Wolfgang von Goethe, Faust) (but hardcover doesn't seem to have a separate author last name, so we ball)
        }));
    }

    public void add(Book book) {
        int id = book.getId();

        for (int i = 0; i < books.size(); i++) {
            if (books.get(i).getId() == id) {
                return;
            }
        }


        books.add(book);
        book.setShelfName(this.name);
        sort();
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

        book.setShelfName("");
        sort();
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


        sort();
    }

    public boolean containsId(int id) {
        for (int i = 0; i < books.size(); i++) {
            if (books.get(i).getId() == id) {
                return true;
            }
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

    public String getName() {
        return name;
    }
}
