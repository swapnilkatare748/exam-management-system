import React, { useState } from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggel.jsx";
import profile_pic from "../../assets/assets.js";
import { SidebarData } from "../../source.jsx";
import { userName, userRole } from "../../Data.jsx";
// import QuationsNumberUser from '../HomeComponents/ExamPanel/Quactions/QuationsNumberUser.jsx';

const sidebarItems = SidebarData(userRole);

function Sidebar({ show, onClose }) {
  const { pathname } = useLocation();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <>
      {show && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`flex sidebar ${show ? "show" : ""}`}>
        <div className="middle no-scrollbar">
          <div className="tab-container">
            {sidebarItems.map((item, index) => (
              <div key={index}>
                {/* <div onClick={() => toggleSection(index)} className="menu-item">
                  {item.name_route}
                </div> */}
                <Link 
                  onClick={() => toggleSection(index)}
                  to={item.path || "#"}
                  className={`menu-item ${
                    pathname === item.path ? "active" : ""
                  }`}
                >
                  {item.name_route}
                </Link>

                {openSection === index && item.subRoutes?.length > 0 && (
                  <div className="sub-menu">
                    {item.subRoutes.map((subItem, subIndex) => (
                      <div key={subIndex} className="sub-item">
                        <Link
                          to={subItem.path}
                          className={pathname === subItem.path ? "active" : ""}
                        >
                          {subItem.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bottom">
          <div className="flex-center user-container">
            <div className="profile">
              <img
                src={profile_pic}
                className="userprofile"
                alt="User Profile"
              />
            </div>
            <div className="details">
              <h4>{userName}</h4>
              <small className="muted clamp-1">Frontend Developer</small>
            </div>
            <div className="flex-center toggle-container">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
