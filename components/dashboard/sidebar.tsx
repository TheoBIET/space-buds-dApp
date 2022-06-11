import Router from "next/router";
import styles from "../../styles/components/Sidebar.module.scss";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

// Icons import
import { BiWorld } from "react-icons/bi";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { GiLockedChest, GiTicket } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";

export default function SideBar() {
  const { publicKey, wallet, disconnect } = useWallet();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(Router.pathname.split("/")[1]);

    if (!publicKey) {
      // Redirect to the profile page if the user is logged in
      navigateTo("/");
    }
  }, [publicKey]);

  const navigateTo = (path: string) => {
    const lowPath = path.toLowerCase();
    setCurrentPath(lowPath);
    Router.push(`${lowPath}`);
  };

  const links = [
    {
      icon: <BiWorld />,
      text: "Timeline",
    },
    {
      icon: <FaUser />,
      text: "Profile",
    },
    {
      icon: <GiLockedChest />,
      text: "Staking",
    },
    {
      icon: <GiTicket />,
      text: "Raffles",
    },
    {
      icon: <FaCalendarAlt />,
      text: "Calendar",
    },
    {
      icon: <IoMdSettings />,
      text: "Settings",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src="/logo_white.png" alt="logo" height={75} width={75} />
        <h1>spacebuds</h1>
      </div>
      <nav className={styles.navbar}>
        {links.map((link, index) => (
          <div
            onClick={() => navigateTo(link.text)}
            key={link.text}
            className={`${styles.link} ${
              currentPath === link.text.toLowerCase() ? styles.active : ""
            }`}>
            <span className={styles.icon}>{link.icon}</span>
            <span className={styles.text}>{link.text}</span>
          </div>
        ))}
        <div className={styles.bottom}>
          <div className={styles.link} onClick={disconnect}>
            <span className={styles.icon}>
              <BiLogOut />
            </span>
            <span className={styles.text}>Log Out</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
