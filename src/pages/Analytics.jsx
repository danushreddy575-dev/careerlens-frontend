import {
useEffect,
useState
}
from "react";

import Navbar
from "../components/Navbar";

import {
getAnalytics
}
from "../services/analyticsService";

export default function Analytics(){

const [data,setData]=
useState(null);

useEffect(()=>{

load();

},[]);

async function load(){

const res=
await getAnalytics();

setData(
res.data
);

}

if(!data)
return(
<h2>
Loading...
</h2>
);

return(

<>

<Navbar/>

<div
className="container"
>

<h1>
Analytics
</h1>

<div
className="card"
>

Total Jobs:

{
data.totalJobs
}

</div>

<div
className="card"
>

Total Users:

{
data.totalUsers
}

</div>

<div
className="card"
>

<h3>
Top Skills
</h3>

{

data.topSkills
.map(

([skill,count])=>(

<p
key={skill}
>

{skill}
:

{count}

</p>

)

)

}

</div>

</div>

</>

);

}