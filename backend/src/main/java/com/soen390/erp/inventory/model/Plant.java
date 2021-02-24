package com.soen390.erp.inventory.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.soen390.erp.manufacturing.model.Bike;
import com.soen390.erp.manufacturing.model.Material;
import com.soen390.erp.manufacturing.model.Part;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
//@Data

public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String address;

//    @OneToMany(mappedBy = "plant")
//    private List<Material> materials;

//    @OneToMany(mappedBy = "plant")
//    private List<Part> parts;

//    @OneToMany(mappedBy = "plant")
//    private List<Bike> bikes;

//    @JsonManagedReference
    @OneToMany( fetch = FetchType.EAGER)
    @JoinColumn(name = "plantmaterial_id")
    private Set<PlantMaterial> materials;

    @OneToMany( fetch = FetchType.EAGER)
    @JoinColumn(name = "plantpart_id")
    private Set<PlantPart> parts;

    @OneToMany(mappedBy = "plant")
    private List<SupplierOrder> supplierOrders;

    public void addPlantMaterial(PlantMaterial plantMaterial){
        if (materials == null){
            materials = new HashSet<>();
        }
        this.materials.add(plantMaterial);
    }

    public Optional<Set<PlantPart>> getParts() {
        return Optional.ofNullable(parts);
    }


//    public int getId() {
//        return id;
//    }
//
//    public void setId(int id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getAddress() {
//        return address;
//    }
//
//    public void setAddress(String address) {
//        this.address = address;
//    }
//    @JsonManagedReference
//    public List<Material> getMaterials() {
//        return materials;
//    }
//
//    public void setMaterials(List<Material> materials) {
//        this.materials = materials;
//    }
//    @JsonManagedReference
//    public List<Part> getParts() {
//        return parts;
//    }
//
//    public void setParts(List<Part> parts) {
//        this.parts = parts;
//    }
//    @JsonManagedReference
//    public List<Bike> getBikes() {
//        return bikes;
//    }
//
//    public void setBikes(List<Bike> bikes) {
//        this.bikes = bikes;
//    }
}
