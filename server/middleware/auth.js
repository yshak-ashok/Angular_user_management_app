const jwt = require('jsonwebtoken')

const authenticateToken = async(req,res,next)=>{
   try {
      const authHeader = req.headers['authorization'];
      
      const token = authHeader &&  authHeader.split(' ')[1];

      if(token == null) return res.status(401).json({error:'Token Error'});
      const ptok=JSON.parse(token)

      jwt.verify(ptok,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
         if(err) {
            console.log(err.message);
            return res.status(403).json({error:'Token Error'})
         }
         req.user = user
         next()
      });
   } catch (error) {
      
   }
}

module.exports = authenticateToken;