package tbr.concept;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Wrapper {
    private static final String API_URL = "https://api.hardcover.app/v1/graphql";
    private static final String API_TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXJkY292ZXIiLCJ2ZXJzaW9uIjoiOCIsImp0aSI6IjY2MWM4NmViLTE2ZjEtNDkxMy05NzcxLTllZDFkY2Y3YTc4ZSIsImFwcGxpY2F0aW9uSWQiOjIsInN1YiI6Ijg4OTc5IiwiYXVkIjoiMSIsImlkIjoiODg5NzkiLCJsb2dnZWRJbiI6dHJ1ZSwiaWF0IjoxNzc1NDI5MzExLCJleHAiOjE4MDY5NjUzMTEsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1yb2xlIjoidXNlciIsIlgtaGFzdXJhLXVzZXItaWQiOiI4ODk3OSJ9LCJ1c2VyIjp7ImlkIjo4ODk3OX19.Mzpi2bQ0ZBTLTpx2cjNR9bmoUJFLkiyJ1YXGEeJO8aE"; //i'll fix this when after i open source, i swear

    public Wrapper(){

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

        return response.body();
    }
}
