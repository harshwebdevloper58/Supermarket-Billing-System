const JWT=require("jsonwebtoken");
const secret ="harsh@2006"

function createjwttoken(user){
    const payload={
        _id:user._Id,
        fullname:user.name,
    };
    const token=JWT.sign(payload,secret);
    return token;
}

async function validatejwtToken(token){
    const payload=await JWT.verify(token,secret);
    return payload;
}

module.exports={
    createjwttoken,
    validatejwtToken,
}