import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { useUserContext } from "@/context/userContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

import { sidebarLinks } from "@/constants";
import { Button } from "../ui/button";

import { INavLink } from "@/types";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const { pathname } = useLocation();
  const { user } = useUserContext();

  return (
    <nav className={`leftsidebar`}>
      <div className='flex flex-col gap-11'>
        <Link to={"/"} className='flex gap-3 items-center'>
          <img
            src='/assets/images/logo.svg'
            alt='logo'
            width={170}
            height={36}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img
            src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
            alt='profile'
            width={50}
            height={50}
            className='rounded-full object-cover'
          />
          <div className='flex flex-col'>
            <p className='body-bold'>{user.name}</p>
            <p className='small-regular text-light-3'>@{user.name}</p>
          </div>
        </Link>
        <ul className='flex flex-col gap-3'>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className={"flex gap-4 p-4 items-center"}
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        onClick={() => {
          signOut();
        }}
        variant='ghost'
        className='shad-button_ghost'
      >
        <img src='/assets/icons/logout.svg' alt='logout' />
        <p className='small-medium lg:base-medium'>Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSideBar;
