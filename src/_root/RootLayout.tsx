import Bottombar from "@/components/shared/BottomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import TopBar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <TopBar />
      <LeftSideBar />
      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
