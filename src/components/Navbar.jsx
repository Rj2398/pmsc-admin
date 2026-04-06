import React from "react";


function Navbar({setShowSidebar}){
   return(
    <>
    <nav>
			<div className="nav-toggle" onClick={() => setShowSidebar((prev) => !prev)}>
				<div className='bx bx-menu'>
					<img src="images/sidebar-collapse.svg" alt=""/>
				</div>
				Sales Admin
			</div>

			<div className="admin-icon ms-auto">
				<img src="images/user.svg" alt=""/>
			</div>
		</nav>
    </>
   )
}

export default Navbar;