package tbr.concept;

public class Work {
    private int id;
    private String title;
    private String slug;
    private String description;
    private String[] authors;
    private String coverURL;
    private String featuredSeriesName;
    private String featuredSeriesPos;
    private String featuredSeriesSlug;
    private int featuredSeriesId;
    private String[] genres;
    private String[] isbn;
    private String[] seriesNames;
    private String[] contentWarnings;

    public Work(int id, String title, String slug, String description, String[] authors, String coverURL, String featuredSeriesName, String featuredSeriesPos, String featuredSeriesSlug, int featuredSeriesId, String[] genres, String[] isbn, String[] seriesNames, String[] contentWarnings) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.authors = authors;
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

    public String[] getAuthors() {
        return authors;
    }

    public String getCoverURL() {
        return coverURL;
    }

    public String getFeaturedSeriesName() {
        return featuredSeriesName;
    }

    public String getFeaturedSeriesPos() {
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
}
