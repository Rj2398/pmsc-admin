import React from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutPopup from "./LogoutPopup";

function SideBar({showSidebar}) {
  const location = useLocation(); // 🔥 FIX

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "/images/menu/1.svg",
    },
    {
      name: "Client Management",
      path: "/client-management",
      icon: "images/clients.svg",
    },
    {
      name: "Logout",
      path: "/",
      icon: "images/logout.svg",
    },
  ];

  const isActive = (item) => {
    const currentPath = location.pathname;
    const itemPath = item.path?.trim();

    return currentPath === itemPath;
  };

  return (
    <>
      <section id="sidebar"   className={`${showSidebar ? '' : ' hide'}`}>
        <Link to={"/dashboard"} className="brand">
          <img src="images/logo.svg" alt="" />
          <img src="images/coll-logo.svg" alt="" className="collapsed" />
        </Link>

        <ul className="side-menu">
          {menuItems.map((item, index) => (
            <li key={index} className={isActive(item) ? "active" : ""}>
              <Link
                to={item.path}
                data-bs-target={
                  item?.name === "Logout" ? "#logout-popup" : undefined
                }
                data-bs-toggle={item?.name === "Logout" ? "modal" : undefined}
              >
                <img src={item.icon} alt={item.name} />
                <span className="text">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <LogoutPopup />
    </>
  );
}

export default SideBar;

// import React from "react";
// import { Link } from "react-router-dom";
// import LogoutPopup from "./LogoutPopup";

// function SideBar(){

// const menuItems=[
//   {
//     name: 'Dashboard',
//     path: '/dashboard',
//     icon: '/images/menu/1.svg'
//   },
//   {
//     name: 'Client Management',
//     path: '/client-management',
//     icon: 'images/clients.svg'
//   },
//    {
//     name: 'Logout',
//     path: '/',
//     icon: 'images/logout.svg'

//   },

// ]

// // const isActive = (item) => {
// //   if (!item || typeof item !== 'object') return false;

// //   const currentPath = location.pathname;

// //   // Normalize paths by trimming spaces (to avoid malformed matches)
// //   const itemPath = item.path?.trim();

// //   // 1. Exact match
// //   if (currentPath === itemPath) return true;

// // };

//   const isActive = (item) => {
//     const currentPath = location.pathname;
//     const itemPath = item.path?.trim();

//     return currentPath === itemPath;
//   };

//    return(
//     <>
//     <section id="sidebar">
// 		<a href="javascript:void(0);" className="brand">
// 			<img src="images/logo.svg" alt=""/>
// 			<img src="images/coll-logo.svg" alt="" className="collapsed"/>
// 		</a>
// 		<ul className="side-menu">
// 			<h2>Navigation</h2>

// 				{menuItems.map((item, index) => (
// 					<li key={index} className={isActive(item) ? 'active' : ''}>
// 						<Link to={item.path}   data-bs-target= {item?.name==="Logout" && "#delete-popup"} data-bs-toggle={item?.name==="Logout" && "modal"}>
// 							<img src={item.icon} alt={item.name} />
// 							<span className="text">{item.name}</span>
// 						</Link>
// 					</li>
// 				))}

// 		</ul>
// 	</section>

// 	<LogoutPopup/>

//     </>
//    )
// }

// export default SideBar;
