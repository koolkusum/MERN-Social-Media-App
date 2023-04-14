import jwt from "jsonwebtoken";

//next has function continues
export const verifyToken = async (req, res, next) => {
  try {
    //grabbing from frontend
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    //take from right hand side
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
    //error
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};