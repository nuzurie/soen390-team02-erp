package com.soen390.erp.manufacturing.controller;

import com.soen390.erp.configuration.service.LogService;
import com.soen390.erp.email.model.EmailToSend;
import com.soen390.erp.email.service.EmailService;
import com.soen390.erp.manufacturing.exceptions.BikeNotFoundException;
import com.soen390.erp.manufacturing.model.Bike;
import com.soen390.erp.manufacturing.model.Handlebar;
import com.soen390.erp.manufacturing.repository.BikeRepository;
import com.soen390.erp.manufacturing.repository.PartRepository;
import com.soen390.erp.manufacturing.service.BikeModelAssembler;
import com.soen390.erp.configuration.ResponseEntityWrapper;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import java.util.List;

@RestController
public class BikeController {

    private final BikeRepository bikeRepository;
    private final BikeModelAssembler assembler;
    private final PartRepository partRepository;
    private final EmailService emailService;
    private final LogService logService;

    public BikeController(BikeRepository bikeRepository,
                          BikeModelAssembler assembler,
                          PartRepository partRepository,
                          EmailService emailService, LogService logService)
    {
        this.bikeRepository = bikeRepository;
        this.assembler = assembler;
        this.partRepository = partRepository;
        this.emailService = emailService;
        this.logService = logService;
    }

    @GetMapping("/bikes")
    public ResponseEntity<?> all() {

        List<EntityModel<Bike>> bikes = assembler.assembleToModel();
        logService.addLog("Retrived all bikes.");
        return ResponseEntity.ok().body(
                CollectionModel.of(bikes, linkTo(methodOn(BikeController.class).all()).withSelfRel()));
    }

    @GetMapping(path = "/bikes/{id}")
    public ResponseEntity<?> one(@PathVariable int id) {

        Bike bike = bikeRepository.findById(id)
                .orElseThrow(() -> new BikeNotFoundException(id));

        logService.addLog("Retrieve all bikes with id "+id+".");
        return ResponseEntity.ok().body(assembler.toModel(bike));
    }

    @PostMapping("/bikes")
    public ResponseEntityWrapper newBike(@RequestBody Bike bike){

        Handlebar handlebar = bike.getHandlebar();
        partRepository.save(handlebar);

        EntityModel<Bike> entityModel = assembler.toModel(bikeRepository.save(bike));

        //return ResponseEntity.created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(entityModel);

        EmailToSend email = EmailToSend.builder().to("bike.manager@msn.com").subject("Created Bike").body("A new bike has been created with id " + bike.getId()).build();
        emailService.sendMail(email);

        return new ResponseEntityWrapper(ResponseEntity.created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(entityModel)
                , "The bike was successfully created with id " + bike.getId());
    }
}
