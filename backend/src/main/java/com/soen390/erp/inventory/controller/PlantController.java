package com.soen390.erp.inventory.controller;


import com.soen390.erp.inventory.exceptions.PlantNotFoundException;
import com.soen390.erp.inventory.model.Plant;
import com.soen390.erp.inventory.repository.PlantRepository;
import com.soen390.erp.inventory.service.PlantModelAssembler;
import com.soen390.erp.manufacturing.exceptions.MaterialNotFoundException;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
// All plants created
// All information in a plant (materials, parts, bikes) or maybe have orders?

@RestController

public class PlantController {
    private final PlantRepository plantRepository;
    private final PlantModelAssembler pmAssembler;

    public PlantController(PlantRepository plantRepository, PlantModelAssembler pmAssembler){
        this.plantRepository = plantRepository;
        this.pmAssembler = pmAssembler;
    }

    @GetMapping("/plants")
    public ResponseEntity<?> all(){
        List<EntityModel<Plant>> plants = plantRepository.findAll().stream()
                .map(pmAssembler::toModel)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(
                CollectionModel.of(plants, linkTo(methodOn(this.getClass()).all()).withSelfRel()));
    }

    @GetMapping("/plants/{id}")
    public ResponseEntity<?> one(@PathVariable int id){
        Plant plant = plantRepository.findById(id).orElseThrow(() -> new PlantNotFoundException(id));
        return ResponseEntity.ok().body(pmAssembler.toModel(plant));
    }

    @ResponseBody
    @ExceptionHandler(PlantNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String partNotFoundException(PlantNotFoundException ex){
        return ex.getMessage();
    }

}

