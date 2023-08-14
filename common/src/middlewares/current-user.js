const express = require('express');
const jwt = require('jsonwebtoken');
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 * @returns 
 */
const currentUser = (req, res, next) => {
    const session = req.session;
    const jwtKey = process.env.JWT_SECRET;      // Caller already has this loaded into memory
    let token = undefined;

    // Get token if we have it
    if (session != undefined && session != null && session.hasOwnProperty('jwt')) {
        token = req.session.jwt;
    }

    // Return early if no token found
    if (token == undefined) {
        console.log("No JWT found");
        return next();
    }

    
    try {
        //console.log("Token found in session. Validating");
        //console.log(`JWT Key ${jwtKey}`); 
        const payload = jwt.verify(token, jwtKey);
        req.currentUser = payload;
    } catch (error) {
        console.log(error);
    }
    next();
}
module.exports = currentUser;