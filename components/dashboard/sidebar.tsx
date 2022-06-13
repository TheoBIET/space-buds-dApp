import Router from "next/router";
import styles from "../../styles/components/Sidebar.module.scss";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useState } from "react";

// Icons import
import { BiWorld } from "react-icons/bi";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { GiLockedChest, GiTicket } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";

export default function SideBar() {
  const { publicKey, disconnect } = useWallet();
  const [currentPath, setCurrentPath] = useState("");

  const navigateTo = (path: string) => {
    const lowPath = path.toLowerCase();
    setCurrentPath(lowPath);

    if (lowPath === "profile") {
      return Router.push(`/profile/${publicKey?.toString()}`);
    }

    Router.push(`/${lowPath}`);
  };

  const logOut = () => {
    disconnect();
    navigateTo("/");
  };

  const links = [
    {
      icon: <BiWorld />,
      text: "Timeline",
      isPublicKeyNeeded: false,
    },
    {
      icon: <FaUser />,
      text: "Profile",
      isPublicKeyNeeded: true,
    },
    {
      icon: <GiLockedChest />,
      text: "Staking",
      isPublicKeyNeeded: false,
    },
    {
      icon: <GiTicket />,
      text: "Raffles",
      isPublicKeyNeeded: false,
    },
    {
      icon: <FaCalendarAlt />,
      text: "Calendar",
      isPublicKeyNeeded: false,
    },
    {
      icon: <IoMdSettings />,
      text: "Settings",
      isPublicKeyNeeded: false,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src="/logo_white.png" alt="logo" height={75} width={75} />
        <h1>spacebuds</h1>
      </div>
      <nav className={styles.navbar}>
        {links.map((link) =>
          !link.isPublicKeyNeeded || (publicKey && link.isPublicKeyNeeded) ? (
            <div
              onClick={() => navigateTo(link.text)}
              key={link.text}
              className={`${styles.link} ${
                currentPath === link.text.toLowerCase() ? styles.active : ""
              }`}>
              <span className={styles.icon}>{link.icon}</span>
              <span className={styles.text}>{link.text}</span>
            </div>
          ) : null
        )}
        <div className={styles.bottom}>
          {publicKey ? (
            <div className={styles.link} onClick={logOut}>
              <span className={styles.icon}>
                <BiLogOut />
              </span>
              <span className={styles.text}>Log Out</span>
            </div>
          ) : (
            <WalletMultiButton className={styles.maxWidth} />
          )}
        </div>
      </nav>
    </div>
  );
}
