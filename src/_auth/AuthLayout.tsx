import { useUserContext } from "@/context/userContext";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <section className='flex flex-1 justify-center items-center flex-col py-10'>
            <Outlet />
          </section>
          <img
            src='/assets/images/side-img.jpg'
            className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
            height={1200}
            width={100}
            alt='photo collage'
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
