import {
Routes,
Route
}
from "react-router-dom";
import SkillInsights from "./pages/SkillInsights";
import Profile
from "./pages/Profile";

import InboxJobs from "./pages/InboxJobs";

import Jobs from "./pages/Jobs";

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
element={<Jobs/>}
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
path="/jobs"
element={<Jobs/>}
/>

<Route
  path="/inbox"
  element={
    <ProtectedRoute>
      <InboxJobs />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <SkillInsights />
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
