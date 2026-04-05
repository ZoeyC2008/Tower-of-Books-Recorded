package tbr.concept;

import java.util.*;

public class Shelf {
    ArrayList<Work> books;

    public Shelf(){
        books = new ArrayList<Work>();
    }

    public void add(Work work){
        if (books.contains(work)) {
            return;
        }
        books.add(work);
    }

    public void remove(Work work){
        if (books.contains(work)){
            books.remove(work);
        }
    }

    public Work getBook(int index){
        return books.get(index);
    }

    public boolean contains(Work work){
        return books.contains(work);
    }
}
