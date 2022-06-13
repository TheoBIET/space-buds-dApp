/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import styles from "../../../styles/layouts/Profile.module.scss";

import { BiCopy } from "react-icons/bi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useRouter } from "next/router";

export default function Header() {
  const [currentPath, setCurrentPath] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [publicKeyFormatted, setPublicKeyFormatted] = useState('');
  const router = useRouter();
  const pubKeyParam = router.query?.pubKey as string;

  useEffect(() => {
    setCurrentPath(router.pathname);

    if (router.isReady) {
      const pubKey = router.query?.pubKey as string;
      const pubKeyFormatted = `${pubKey
        .split("")
        .splice(0, 4)
        .join("")}...${pubKey.split("").splice(-4).join("")}`;
      setPublicKey(pubKey);
      setPublicKeyFormatted(pubKeyFormatted);
    }
  }, [router]);

  const copyWallet = () => {
    navigator.clipboard.writeText(publicKey);
  };

  const navigateTo = (path: string) => {
    const lowPath = path;
    setCurrentPath(lowPath);
    router.push(`${lowPath}`);
  };

  return (
    <div className={styles.overview}>
      <div className={styles.cover}></div>
      <div className={styles.socialsList}></div>
      <img
        className={styles.picture}
        src="https://thumbs.dreamstime.com/b/transf%C3%A9rez-l-avatar-texte-d-attente-de-photo-profil-125707135.jpg"
        alt="avatar"
      />
      <div className={styles.name}>
        <h1 className={styles.username}>@{publicKey.split('').splice(0,15)}...</h1>
        <div onClick={copyWallet} className={styles.wallet}>
          <BiCopy />
          <span>{publicKeyFormatted}</span>
        </div>
      </div>
      <div className={styles.description}>
        No description yet.
      </div>
      <div className={styles.statistics}>
        <div className={styles.follows}>
          <span className={styles.bold}>0</span> followers | 
          <span className={styles.bold}>0</span> followed
        </div>
        <div className={`${styles.followButton} ${styles.disabled}`}>
          <HiOutlineUserAdd />
          Follow
        </div>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li
            className={`${
              !currentPath.includes("inventory") &&
              !currentPath.includes("pictures")
                ? styles.active
                : ""
            }`}
            onClick={() => navigateTo(`/profile/${pubKeyParam}`)}>
            Feed
          </li>
          <li
            className={`${
              currentPath.includes("inventory") ? styles.active : ""
            }`}
            onClick={() => navigateTo(`/profile/${pubKeyParam}/inventory`)}>
            Inventory
          </li>
          <li
            className={`${
              currentPath.includes("pictures") ? styles.active : ""
            }`}
            onClick={() => navigateTo(`/profile/${pubKeyParam}/pictures`)}>
            Pictures
          </li>
        </ul>
      </nav>
    </div>
  );
}
