import {
useState
} from "react";

import AuthModal from "./AuthModal";

export default function ProtectedRoute({
children
}){

const token=
localStorage.getItem("token");

const [authenticated,setAuthenticated]=
useState(Boolean(token));

if(authenticated){
return children;
}

return(
<AuthModal
showClose={false}
onSuccess={()=>
setAuthenticated(true)
}
/>
);

}
