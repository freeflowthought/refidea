export function isEmail(email)
{
    let emailFormat=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
if(email !== undefined && email.match(emailFormat)){
    return true;
}
else{
    return false;
}
}

export function isPassword(password){
        let passFormat =  /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,50}$/;
        if(password !==undefined && password.match(passFormat)){
            return true;
        }
        else{
            return false;
        }

}