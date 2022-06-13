/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import styles from "../../../styles/layouts/Profile.module.scss";
import { useWallet } from "@solana/wallet-adapter-react";

import { BiCopy } from "react-icons/bi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useRouter } from "next/router";

export default function Header() {
  const { publicKey } = useWallet();
  const [currentPath, setCurrentPath] = useState('');
  const router = useRouter();
  const pubKeyParam = router.query?.pubKey
  const publicKeyFormatted = `${pubKeyParam}`.split('').splice(0, 4).join('') + '...' + `${pubKeyParam}`.split('').splice(-4).join('')
  

  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router]);

  const copyWallet = () => {
    navigator.clipboard.writeText(`${pubKeyParam}`);
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
        src="https://susanoo.mypinata.cloud/ipfs/QmdJXHKakL96mUNVcct6rd3UL5Nq2umac4NwibHPAtAuTA/5324.png"
        alt="avatar"
      />
      <div className={styles.name}>
        <h1 className={styles.username}>@ƊɑѵƊɑѵ</h1>
        <div onClick={copyWallet} className={styles.wallet}>
          <BiCopy />
          <span>{publicKeyFormatted}</span>
        </div>
      </div>
      <div className={styles.description}>
        20 | 🇫🇷 Fullstack Web Developper 💻 <br />
        Studying Deep Learning #SOL 🚀`
      </div>
      <div className={styles.statistics}>
        <div className={styles.follows}>
          <span className={styles.bold}>234,5k</span> followers | 
          <span className={styles.bold}>234</span> followed
        </div>
        <div className={styles.followButton}>
          <HiOutlineUserAdd />
          Follow
        </div>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li
            className={`${currentPath === "/profile" ? styles.active : ""}`}
            onClick={() => navigateTo(`/profile/${publicKey?.toString()}`)}>
            Feed
          </li>
          <li
            className={`${
              currentPath.includes("inventory") ? styles.active : ""
            }`}
            onClick={() => navigateTo(`/profile/${publicKey?.toString()}/inventory`)}>
            Inventory
          </li>
          <li
            className={`${
              currentPath.includes("pictures") ? styles.active : ""
            }`}
            onClick={() => navigateTo(`/profile/${publicKey?.toString()}/pictures`)}>
            Pictures
          </li>
        </ul>
      </nav>
    </div>
  );
}
