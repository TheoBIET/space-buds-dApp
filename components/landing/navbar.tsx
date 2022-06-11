import Link from "next/link";
import Image from "next/image";
import Router from 'next/router';
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";

import styles from "../../styles/components/Navbar.module.scss";

export default function Navbar() {
  const { publicKey, wallet, disconnect } = useWallet();

  useEffect(() => {
    const currentPath = Router.pathname;
    if (currentPath === "/") {
      if (wallet && publicKey) {
        // Redirect to the timeline page if the user is logged in
        Router.push("/timeline");
      }
    }
  }, [wallet, publicKey]);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <Image src="/logo_white.png" alt="logo" height={120} width={120} />
          </a>
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.link}>Home</a>
        </Link>
        <Link href="/roadmap">
          <a className={styles.link}>Roadmap</a>
        </Link>
        <Link href="/roadmap">
          <a className={styles.link}>Team</a>
        </Link>
        <Link href="https://discord.gg/e8BDZXpGfS">
          <a className={styles.link}>Discord</a>
        </Link>
      </nav>
      <WalletMultiButton />
    </div>
  );
}
