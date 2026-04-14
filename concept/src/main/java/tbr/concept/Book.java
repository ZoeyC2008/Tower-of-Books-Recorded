package tbr.concept;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

import java.util.Arrays;

@Entity
public class Book {
    @Id
    private int id;
    private String title;
    private String slug;
    private String description;
    //private String[] authors;
    private String coverURL;
    private String featuredSeriesName;
    private int featuredSeriesPos;
    private String featuredSeriesSlug;
    private int featuredSeriesId;
    private String[] genres;
    private String[] isbn;
    private String[] seriesNames;
    private String[] contentWarnings;

    @JsonIgnore
    @Column(name = "shelf_name")
    private String shelfName = null;

    public Book(){}

    @JsonCreator
    public Book(
            @JsonProperty("id") int id,
            @JsonProperty("title") String title,
            @JsonProperty("slug") String slug,
            @JsonProperty("description") String description,
            @JsonProperty("authors") String[] authors,
            @JsonProperty("coverURL") String coverURL,
            @JsonProperty("featuredSeriesName") String featuredSeriesName,
            @JsonProperty("featuredSeriesPos") int featuredSeriesPos,
            @JsonProperty("featuredSeriesSlug") String featuredSeriesSlug,
            @JsonProperty("featuredSeriesId") int featuredSeriesId,
            @JsonProperty("genres") String[] genres,
            @JsonProperty("isbn") String[] isbn,
            @JsonProperty("seriesNames") String[] seriesNames,
            @JsonProperty("contentWarnings") String[] contentWarnings
    )  {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.setAuthors(authors);
        this.coverURL = coverURL;
        this.featuredSeriesName = featuredSeriesName;
        this.featuredSeriesPos = featuredSeriesPos;
        this.featuredSeriesSlug = featuredSeriesSlug;
        this.featuredSeriesId = featuredSeriesId;
        this.genres = genres;
        this.isbn = isbn;
        this.seriesNames = seriesNames;
        this.contentWarnings = contentWarnings;
    }


    @ElementCollection
    private List<String> authors; // what JPA sees

    // Getter your existing code already uses — converts back to array
    public String[] getAuthors() {
        return authors == null ? new String[0] : authors.toArray(new String[0]);
    }

    // Setter your existing code already uses — converts from array
    public void setAuthors(String[] authors) {
        this.authors = authors == null ? new ArrayList<>() : new ArrayList<>(Arrays.asList(authors));
    }

    public void setShelfName(String shelf) {
        this.shelfName = shelf;
    }

    @JsonProperty("shelf")
    public String getShelfName() {
        return shelfName;
    }

    //getters
    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSlug() {
        return slug;
    }

    public String getDescription() {
        return description;
    }

//    public String[] getAuthors() {
//        return authors;
//    }

    public String getCoverURL() {
        return coverURL;
    }

    public String getFeaturedSeriesName() {
        return featuredSeriesName;
    }

    public int getFeaturedSeriesPos() {
        return featuredSeriesPos;
    }

    public String getFeaturedSeriesSlug() {
        return featuredSeriesSlug;
    }

    public int getFeaturedSeriesId() {
        return featuredSeriesId;
    }

    public String[] getGenres() {
        return genres;
    }

    public String[] getIsbn() {
        return isbn;
    }

    public String[] getSeriesNames() {
        return seriesNames;
    }

    public String[] getContentWarnings() {
        return contentWarnings;
    }

    @Override
    public String toString() {
        return "Book{id=" + id + ", title='" + title + "', authors=" + Arrays.toString(this.getAuthors()) + "}";
    }
}
