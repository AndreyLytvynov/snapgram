import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import "./global.css";
import { Toaster } from "@/components/ui/toaster";

const Signinform = lazy(() => import("./_auth/forms/Signinform"));
const Signupform = lazy(() => import("./_auth/forms/Signupform"));
const AllUsers = lazy(() => import("./_root/pages/AllUsers"));
const CreatePost = lazy(() => import("./_root/pages/CreatePost"));
const EditPost = lazy(() => import("./_root/pages/EditPost"));
const Explore = lazy(() => import("./_root/pages/Explore"));
const Home = lazy(() => import("./_root/pages/Home"));
const PostDetails = lazy(() => import("./_root/pages/PostDetails"));
const Profile = lazy(() => import("./_root/pages/Profile"));
const Saved = lazy(() => import("./_root/pages/Saved"));
const UpdateProfile = lazy(() => import("./_root/pages/UpdateProfile"));

function App() {
  return (
    <Suspense fallback={false}>
      <main className='flex h-screen'>
        <Routes>
          {/* public route */}
          <Route element={<AuthLayout />}>
            <Route path='/sign-in' element={<Signinform />} />
            <Route path='/sign-up' element={<Signupform />} />
          </Route>

          {/* private route */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/saved' element={<Saved />} />
            <Route path='/all-users' element={<AllUsers />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post/:id' element={<EditPost />} />
            <Route path='/posts/:id' element={<PostDetails />} />
            <Route path='/profile/:id/' element={<Profile />} />
            <Route path='/update-profile/:id' element={<UpdateProfile />} />
          </Route>
          <Route path='*' element={<Navigate to={"/"} replace />} />
        </Routes>
        <Toaster />
      </main>
    </Suspense>
  );
}

export default App;
