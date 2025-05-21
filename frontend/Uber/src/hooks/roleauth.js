import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
const roleauth=()=>{
const AccessToken=Cookies.get("Accesstoken");

if(!AccessToken){
    console.log('Errror and still error');
    return {isAuthenticated:false}
}
try {
    
    const decode=jwtDecode(AccessToken);
    return {
        isAuthenticated:true,
        role: decode.role,
        userId: decode._id,
    };
} catch (error) {
    return {isAuthenticated:false};
    
}

};
export default  roleauth;