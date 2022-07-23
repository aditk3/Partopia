package com.cognizant.PartyService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.minidev.json.JSONObject;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

@Component
public class QueueConsumer {
    boolean DEBUG = false;

    @Autowired
    private PartyRepo partyRepo;

    @RabbitListener(queues = "${queue.name}")
    public void receivedMessage(String json) {
        assert (json != null);

        ObjectMapper objectMapper = new ObjectMapper();

        PartyUserDTO theResult;

        try {
            theResult = objectMapper.readValue(json, PartyUserDTO.class);
        } catch (JsonProcessingException e) {
            theResult = null;
        }

        long partyId = theResult.getPartyId();
        long userId = theResult.getUserId();

        if (DEBUG) {
            System.out.println(partyId);
            System.out.println(userId);
        }

        Optional<Party> party = partyRepo.findById(partyId);

        if (party.isPresent()) {
            ArrayList<Long> att = party.get().getAttendees();
            att.add(userId);
            party.get().setAttendees(att);
            partyRepo.save(party.get());

            if (DEBUG) {
                System.out.println(att);

                System.out.println("we did it!");
                System.out.println(partyId);
                System.out.println(userId);
            }

            return;
        }

        System.out.println("invalid partyId");
    }
} 
