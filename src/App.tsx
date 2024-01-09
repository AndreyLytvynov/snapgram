import { Routes, Route } from "react-router-dom";

import Signinform from "./_auth/forms/Signinform";
import Signupform from "./_auth/forms/Signupform";
import { Home } from "./_root/pages";
import "./global.css";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* privet route */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<Signinform />} />
          <Route path='/sign-up' element={<Signupform />} />
        </Route>

        {/* public route */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
