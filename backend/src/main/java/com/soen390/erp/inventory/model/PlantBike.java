package com.soen390.erp.inventory.model;

import com.soen390.erp.manufacturing.model.Bike;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Min;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class PlantBike {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "bike_id")
    private Bike bike;

    @Min(value = 1)
    private int quantity;
}
