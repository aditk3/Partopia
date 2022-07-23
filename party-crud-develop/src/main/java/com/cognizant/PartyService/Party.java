package com.cognizant.PartyService;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Party {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long party_id;

    @NotNull
    private String partyName;

    @NotNull
    private String startTime;

    @Column(nullable = false)
    private String startDate;

    private String img;

    private String description;

    private String location;

    private double price;

    private int host;

    private int maxCapacity;

    private ArrayList<Long> attendees;
}
