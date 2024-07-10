const {validatejwtToken}=require("../services/authetication")

function checkForAuthenticationcookies(cookieName){
    
    return async(req,res,next)=>{
        const tokencookieValue=req.cookies[cookieName];
        if(!tokencookieValue) {
           return next()
        }
        try {
            const userPayload=await validatejwtToken(tokencookieValue);
            req.user=userPayload;
        } catch (error) {}
         return next()
    }
}

module.exports={
    checkForAuthenticationcookies,
};