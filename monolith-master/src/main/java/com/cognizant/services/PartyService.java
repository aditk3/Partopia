package com.cognizant.services;

import com.cognizant.models.Party;
import com.cognizant.models.User;
import com.cognizant.repos.PartyDAO;
import com.cognizant.repos.UserDAO;
import com.cognizant.utils.JWT;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartyService {

    @Autowired
    private final PartyDAO partyDAO;
    private final UserService userService;
    private final UserDAO userDao;

    // get all parties
    public List<Party> getParties() {
        return partyDAO.findAll();
    }

    // get a party by id
    public Party getParty(int id) {
         try {
             return partyDAO.getById(id);
         } catch(Exception e) {
             return null;
         }
    }

    // add/update a party
    public Party saveOrUpdateParty(Party party, String token) {
        if(checkToken(userService.getUserById(party.getHost()), token)) {
                return partyDAO.save(party);
        }
        return null;
    }

    // add a user to a party
    public Party addUserToParty(Party party, User user, String token) {
        if(checkToken(user, token) && party.getHost() != user.getUser_id()) {

            updateEntityLists(party, user);

            //update DB's so join table is updated automatically by ORM
            userDao.save(user);
            return partyDAO.save(party);
        }
        return null;
    }

    // delete a party
    public boolean deleteParty(Party party, String token) {
        if(checkToken(userService.getUserById(party.getHost()), token)) {
            try {
                //remove party to delete from each user that was to attend the party...to maintain ref integrity
                List<User> attendees = party.getAttendees();
                attendees.stream().forEach(user -> {
                   List<Party> parties = user.getParties();
                   parties.remove(party);
                   user.setParties(parties);
                });
                partyDAO.delete(party);
                return true;
            } catch (Exception e) {
                return false;
            }
        }
        return false;
    }

    // user can cancel attending a party
    public Party removeUserFromParty(Party party, User user, String token) {
        if(party.getAttendees().contains(user) && checkToken(user, token)) {
            updateEntityListsRemove(party, user);
            userDao.save(user);
            return partyDAO.save(party);
        }
        return null;
    }

    public boolean checkUserInsideParty(Party party, User user, String token) {
        if(checkToken(user, token)) {
            System.out.println("token is good");
            return party.getAttendees().contains(user);
        }
        //invalid token
        return false;
    }

    // method for checking token validity
    private boolean checkToken(User user, String token) {
        if(!JWT.isTokenExpired(token) && user.getEmail().equalsIgnoreCase(JWT.getUser(token).getEmail())){
            return true;
        }
        return false;
    }

    private void updateEntityLists(Party party, User user) {
        //must use set to update attendees list on party object
        List<User> attendees = party.getAttendees();
        attendees.add(user);
        party.setAttendees(attendees);

        //must use set to update parties list on a user
        List<Party> parties = user.getParties();
        parties.add(party);
        user.setParties(parties);
    }

    private void updateEntityListsRemove(Party party, User user) {
        //must use set to update attendees list on party object
        List<User> attendees = party.getAttendees();
        attendees.remove(user);
        party.setAttendees(attendees);

        //must use set to update parties list on a user
        List<Party> parties = user.getParties();
        parties.remove(party);
        user.setParties(parties);
    }



}
