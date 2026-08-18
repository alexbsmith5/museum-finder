package com.alexbsmith5.museumfinder;

import org.eclipse.rdf4j.query.resultio.sparqljson.SPARQLResultsJSONWriter;
import org.eclipse.rdf4j.repository.sparql.SPARQLRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Collections;

@Service
public class WikidataService {
    private final RestClient restClient;
    private final SPARQLRepository sparqlRepo;

    public WikidataService() {
        String userAgent = "MuseumFinder/1.0 (https://github.com/alexbsmith5/museum-finder; alexbsmith52@gmail.com)";

        // initialize action api
        this.restClient = RestClient.builder()
                .baseUrl("https://www.wikidata.org")
                .defaultHeader(
                        "User-Agent",
                        userAgent
                )
                .build();

        // initialize SPARQL query service
        this.sparqlRepo = new SPARQLRepository("https://query.wikidata.org/sparql");
        this.sparqlRepo.setAdditionalHttpHeaders(Collections.singletonMap("User-Agent", userAgent));
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

    public JsonNode getWorks(String itemId) {
        String querySelect = "SELECT ?item ?itemLabel ?image ?location WHERE {\n" +
                "  ?item wdt:P170 wd:" + itemId + ".\n" +
                "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],mul,en\". }\n" +
                "  OPTIONAL { ?item wdt:P18 ?image. }\n" +
                "  OPTIONAL { ?item wdt:P276 ?location. }\n" +
                "}\n" +
                "LIMIT 100";

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try {
            this.sparqlRepo.getConnection().prepareTupleQuery(querySelect).evaluate(new SPARQLResultsJSONWriter(outputStream));

            ObjectMapper mapper = new ObjectMapper();
            return mapper.readTree(outputStream.toByteArray());
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }

    }
}
