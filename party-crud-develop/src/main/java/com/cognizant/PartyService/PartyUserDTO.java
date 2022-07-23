package com.cognizant.PartyService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PartyUserDTO {
    private long partyId;
    private long userId;
}
