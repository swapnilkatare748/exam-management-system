import React from "react";
import UserProfile from "../../../Components/AdmineComponents/User'sCom/UserProfile";
import styles from "./UsersPage.module.css";
import WebsiteWrapper from "../../../Components/WebsiteWrapper";

function UsersPage() {
  return (
    <WebsiteWrapper>
      <div className={styles.UserProfile}>
       <UserProfile/>
      </div>
    </WebsiteWrapper>
  );
}

export default UsersPage;
