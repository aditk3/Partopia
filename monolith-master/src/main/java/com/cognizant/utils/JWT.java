package com.cognizant.utils;

import com.cognizant.models.Auth;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;


public class JWT {

    public static final long JWT_TOKEN_VALIDITY_MS = 1000 * 60 * 60 * 24L;

    private static final String secret = "secret"; //todo - hide

    public static Auth getUser(String token){
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        System.out.println(claims.toString());
        return new Auth((Integer)claims.get("id"), (String) claims.get("email"));
    }

    public static boolean isTokenExpired(String token){
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
            return false;
        }
        catch(ExpiredJwtException e){
            return true;
        }
    }

    public static String generateToken(Auth user){
//        if(user.getEmail() == null || user.getId() = null){
//            throw new IllegalArgumentException();
//        }

        HashMap<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail().toLowerCase(Locale.ROOT));
        claims.put("id", user.getId());

        return Jwts.builder().setClaims(claims).setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY_MS))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }

}

