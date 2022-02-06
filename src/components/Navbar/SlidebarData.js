import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Login",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "Creat Schedule",
    path: "/createschedule",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text"
  },
  {
    title: "Accepted List",
    path: "/acceptedlist",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text"
  }
];
