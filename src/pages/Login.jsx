import {
useState
} from "react";

import {
login
}
from "../services/authService";

import {
useNavigate
}
from "react-router-dom";

export default function Login(){

const nav=
useNavigate();

const [form,setForm]=
useState({
email:"",
password:""
});

const submit=
async()=>{

const res=
await login(form);

localStorage.setItem(
"token",
res.data.token
);

nav("/dashboard");

};

return(

<div>

<h2>Login</h2>

<input
placeholder="Email"
onChange={
e=>
setForm({
...form,
email:e.target.value
})
}
/>

<input
type="password"
placeholder="Password"
onChange={
e=>
setForm({
...form,
password:e.target.value
})
}
/>

<button
onClick={submit}
>
Login
</button>

</div>

);

}