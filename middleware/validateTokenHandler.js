const asyncHandler=require("express-async-handler")
const jwt=require("jsonwebtoken");

const validateToken=asyncHandler(async(req,res,next)=>{
    try {
        // Extract token from headers
        const token = req.headers.authorization;

        if (!token) {
            res.status(401);
            throw new Error("Unauthorized: No token provided");
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECERET_TOKEN);
        
        // Attach the decoded payload to the request object for future use
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Unauthorized: Invalid token");
    }
})

module.exports=validateToken;