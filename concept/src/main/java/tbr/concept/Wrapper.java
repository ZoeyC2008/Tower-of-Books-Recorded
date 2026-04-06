package tbr.concept;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Arrays;

public class Wrapper {
    private static final String API_URL = "https://api.hardcover.app/v1/graphql";
    private static final String API_TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXJkY292ZXIiLCJ2ZXJzaW9uIjoiOCIsImp0aSI6IjY2MWM4NmViLTE2ZjEtNDkxMy05NzcxLTllZDFkY2Y3YTc4ZSIsImFwcGxpY2F0aW9uSWQiOjIsInN1YiI6Ijg4OTc5IiwiYXVkIjoiMSIsImlkIjoiODg5NzkiLCJsb2dnZWRJbiI6dHJ1ZSwiaWF0IjoxNzc1NDI5MzExLCJleHAiOjE4MDY5NjUzMTEsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1yb2xlIjoidXNlciIsIlgtaGFzdXJhLXVzZXItaWQiOiI4ODk3OSJ9LCJ1c2VyIjp7ImlkIjo4ODk3OX19.Mzpi2bQ0ZBTLTpx2cjNR9bmoUJFLkiyJ1YXGEeJO8aE"; //i'll fix this when after i open source, i swear

    public Wrapper(){

    }

    public Book getBookByID(int id) throws Exception {
        String graphqlQuery = String.format(
                "{ books(where: {id: {_eq: %d}}) { id title slug description image { url } author_names genres content_warnings featured_series { series { name id slug } } featured_series_position } }",
                id
        );

        String requestBody = String.format(
                "{\"query\": \"%s\"}",
                graphqlQuery.replace("\"", "\\\"")
        );

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL))
                .header("Content-Type", "application/json")
                .header("Authorization", API_TOKEN)
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println("RAW RESPONSE:");
        System.out.println(response.body());

        JSONObject json = new JSONObject(response.body());
        JSONArray booksArr = json.getJSONObject("data").getJSONArray("books");

        if (booksArr.isEmpty()) {
            throw new RuntimeException("No book found for id " + id);
        }

        JSONObject doc = booksArr.getJSONObject(0);
        return parseBook(doc);
    }

    public Book[] searchBookReturnArray(String query) throws Exception{
        String searchQuery = "{\"query\": \"{search(query: \\\"" + query + "\\\", query_type: \\\"book\\\") {results}}\"}";

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL))
                .header("Content-Type", "application/json")
                .header("Authorization", API_TOKEN)
                .POST(HttpRequest.BodyPublishers.ofString(searchQuery))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        Book[] searchBooks = parseBooks(response.body());

        //System.out.println(Arrays.toString(searchBooks));

        return searchBooks;
    }

    public String searchBook(String query) throws Exception{
        String searchQuery = "{\"query\": \"{search(query: \\\"" + query + "\\\", query_type: \\\"book\\\") {results}}\"}";

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL))
                .header("Content-Type", "application/json")
                .header("Authorization", API_TOKEN)
                .POST(HttpRequest.BodyPublishers.ofString(searchQuery))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        //System.out.println(response.body());

        Book[] searchBooks = parseBooks(response.body());

        //System.out.println(Arrays.toString(searchBooks));

        return response.body();
    }

    private Book[] parseBooks(String response) throws Exception{
        JSONObject json = new JSONObject(response);

        Object results = json.getJSONObject("data").getJSONObject("search").get("results");

        int count = 0;

        JSONArray hits;
        if (results instanceof String) {
            hits = new JSONObject((String) results).getJSONArray("hits");
        } else {
            hits = ((JSONObject) results).getJSONArray("hits");
        }

        Book[] books = new Book[hits.length()];
        for (int i = 0; i < hits.length(); i++) {
            JSONObject doc = hits.getJSONObject(i).getJSONObject("document");
            books[i] = parseBook(doc);
        }
        return books;
    }

    private Book parseBook(JSONObject doc) throws Exception{
        int id = doc.optInt("id");
        String title = doc.optString("title", "");
        String slug = doc.optString("slug", "");
        String description = doc.optString("description", "");

        String coverURL = "";
        JSONObject image = doc.optJSONObject("image");
        if (image != null) {
            coverURL = image.optString("url", "");
        }

        String[] authors = jsonArrayToStringArray(doc.optJSONArray("author_names"));
        String[] isbn = jsonArrayToStringArray(doc.optJSONArray("isbns"));
        String[] seriesNames = jsonArrayToStringArray(doc.optJSONArray("series_names"));
        String[] genres = jsonArrayToStringArray(doc.optJSONArray("genres"));
        String[] contentWarnings = jsonArrayToStringArray(doc.optJSONArray("content_warnings"));

        // Featured series (first entry in series arrays if present)
        String featuredSeriesName = "";
        int featuredSeriesId = -1;
        String featuredSeriesSlug = "";
        JSONObject featured_series = doc.optJSONObject("featured_series");
        if (featured_series != null) {
            JSONObject series = featured_series.optJSONObject("series");
            if  (series != null) {
                featuredSeriesName = series.optString("name", "");
                featuredSeriesId = series.optInt("id", -1);
                featuredSeriesSlug = series.optString("slug", "");
            }
        }
        int featuredSeriesPos = doc.optInt("featured_series_position", -1);

        return new Book(id, title, slug, description, authors, coverURL, featuredSeriesName, featuredSeriesPos, featuredSeriesSlug,  featuredSeriesId, genres, isbn, seriesNames, contentWarnings);
    }

    private String[] jsonArrayToStringArray(JSONArray arr) {
        if (arr == null) return new String[0];
        String[] result = new String[arr.length()];
        for (int i = 0; i < arr.length(); i++) result[i] = arr.optString(i);
        return result;
    }
}
