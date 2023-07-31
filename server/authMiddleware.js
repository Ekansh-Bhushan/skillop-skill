const authVerification = (req, res, next)=>{
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        Jwt
    }else{

    }
    console.log("middleware called!", token);
    next();
}