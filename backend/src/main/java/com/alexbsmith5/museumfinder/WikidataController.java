package com.alexbsmith5.museumfinder;

import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tools.jackson.databind.JsonNode;

@RestController
public class WikidataController {
    // initialize WikidataService class
    private final WikidataService wikidataService;
    public WikidataController(WikidataService wikidataService){
        this.wikidataService = wikidataService;
    }

    // fuzzy find text to return item identifier "Q..."
    @GetMapping("/search")
    public JsonNode getItemIdentifier(@RequestParam String name) {
        return wikidataService.searchByName(name);
    }
    @GetMapping("/list")
    public JsonNode listWorks(@RequestParam String itemId) {
        return wikidataService.getWorks(itemId);
    }
}
