package com.cognizant.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import java.sql.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Party {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotEmpty
    private String partyName;
    @Column(nullable = false)
    private Date startDate;
    @Lob
    private String img;
    private String description;
    @Column(length = 50)
    private String location;
    @Column(length = 6, nullable = false)
    private String startTime;
    @Min(0)
    private float price;
    private int host;
    @Min(1)
    private int maxCapacity;
    @ManyToMany(mappedBy = "parties", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonIgnoreProperties("parties")
    private List<User> attendees;
}
