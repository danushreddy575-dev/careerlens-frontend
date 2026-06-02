import {
Routes,
Route
}
from "react-router-dom";
import SkillInsights from "./pages/SkillInsights";
import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import InboxJobs from "./pages/InboxJobs";

import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";

import ProtectedRoute
from "./components/ProtectedRoute";
import Analytics
from "./pages/Analytics";

export default function App(){

return(

<Routes>

<Route
path="/analytics"
element={
<ProtectedRoute>

<Analytics/>

</ProtectedRoute>
}
/>

<Route
path="/"
element={<Login/>}
/>

<Route
path="/login"
element={<Login/>}
/>

<Route
path="/register"
element={<Register/>}
/>

<Route
path="/dashboard"
element={
<ProtectedRoute>

<Dashboard/>

</ProtectedRoute>
}
/>

<Route
  path="/inbox"
  element={<InboxJobs />}
/>

<Route
  path="/applications"
  element={<Applications />}
/>

<Route
path="/jobs"
element={
<ProtectedRoute>

<Jobs/>

</ProtectedRoute>
}
/>
<Route
path="/skills"
element={
<ProtectedRoute>
<SkillInsights/>
</ProtectedRoute>
}
/>

</Routes>


);

}