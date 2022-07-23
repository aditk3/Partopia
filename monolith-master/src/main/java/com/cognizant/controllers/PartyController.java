package com.cognizant.controllers;

import com.cognizant.models.Party;
import com.cognizant.models.User;
import com.cognizant.services.PartyService;
import com.cognizant.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/party")
@RequiredArgsConstructor
@Validated
public class PartyController {

    @Autowired
    private final PartyService partyService;
    @Autowired
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<Party>> getAllParties(){
        List<Party> parties = partyService.getParties();
        Collections.reverse(parties);
        return ResponseEntity.status(HttpStatus.OK).body(parties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Party> getPartyById(@PathVariable("id") @Min(1) int id){
        Party party = partyService.getParty(id);
        if(party != null) {
            return ResponseEntity.status(HttpStatus.OK).body(party);
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{userId}/{partyId}")
    public ResponseEntity<Boolean> checkUserInsideParty(@PathVariable("userId") @Min(1) int userId, @PathVariable("partyId") @Min(1) int partyId, @RequestHeader @NotNull String token){
        User user = userService.getUserById(userId);
        Party party = partyService.getParty(partyId);
        if(user != null && party != null) {
            return ResponseEntity.status(HttpStatus.OK).body(partyService.checkUserInsideParty(party, user, token));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping
    public ResponseEntity<Party> addOrUpdateParty(@Valid @RequestBody Party party, @RequestHeader @NotNull String token){

            Party updateParty = partyService.saveOrUpdateParty(party, token);
            if(updateParty != null) {
                return ResponseEntity.status(201).body(updateParty);
            }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/{partyId}/{id}")
    public ResponseEntity<Party> addUserToParty(@PathVariable("partyId") @Min(1) int partId, @PathVariable("id") @Min(1) int id, @RequestHeader @NotNull String token){
        User user = userService.getUserById(id);
        Party party = partyService.getParty(partId);
        if(user != null && party != null) {
            return ResponseEntity.status(HttpStatus.OK).body(partyService.addUserToParty(party, user, token));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @DeleteMapping("remove/{id}/{hostId}")
    public ResponseEntity<Boolean> deleteParty(@PathVariable("id") @Min(1) int id, @PathVariable("hostId") @Min(1) int hostId, @RequestHeader @NotNull String token){
        Party party = partyService.getParty(id);
        if(party != null && party.getHost() == hostId) {
            return ResponseEntity.status(HttpStatus.OK).body(partyService.deleteParty(party, token));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @DeleteMapping("/{partyId}/{userId}")
    public ResponseEntity<Party> removeUserFromParty(@PathVariable("partyId") @Min(1) int partyId, @PathVariable("userId") @Min(1) int userId, @RequestHeader @NotNull String token) {
        Party party = partyService.getParty(partyId);
        User user = userService.getUserById(userId);
        if(party != null && user != null) {
            return ResponseEntity.status(HttpStatus.OK).body(partyService.removeUserFromParty(party, user, token));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

}



