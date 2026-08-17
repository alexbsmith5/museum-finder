package com.alexbsmith5.museumfinder;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import tools.jackson.databind.JsonNode;

@Service
public class WikidataService {
    private final RestClient restClient;

    public WikidataService() {
        this.restClient = RestClient.builder()
                .baseUrl("https://www.wikidata.org")
                .defaultHeader(
                        "User-Agent",
                        "MuseumFinder/1.0 (https://github.com/alexbsmith5/museum-finder; alexbsmith52@gmail.com)"
                )
                .build();
    }

    // return highest ranked item identifier from list of fuzzy searched entries
    public String searchByName(String name) {
        JsonNode rootNode = restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/w/api.php")
                        .queryParam("action", "query")
                        .queryParam("list", "search")
                        .queryParam("srsearch", "%s~".formatted(name))
                        .queryParam("format", "json")
                        .build())
                .retrieve()
                .body(JsonNode.class);
        if (rootNode != null) {
            return rootNode.path("query").path("search").path(0).path("title").asString();
        }

        return "ERROR";
    }
}
