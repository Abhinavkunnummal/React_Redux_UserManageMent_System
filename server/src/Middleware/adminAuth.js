import jwt from 'jsonwebtoken'
 

const adminAuth = (req,res,next) =>{
    const token = req.headers['authorization']?.split(' ')[1];
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err,admin)=>{
            console.log(admin,err)
            if(err){
                return res.sendStatus(402)
            }   
            req.admin=admin
            next()
        })
    }else{
        res.sendStatus(401)    
    }
}

export default adminAuth