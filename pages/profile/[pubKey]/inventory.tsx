import Layout from "../../../components/dashboard/profile/layout";
import styles from "../../../styles/pages/Inventory.module.scss";
import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";

import { BiLoaderAlt } from "react-icons/bi";

export default function Inventory() {
  const [assets, setAssets] = useState<Array<any>>([]);
  const [isLoading, setLoading] = useState(false);
  const { publicKey } = useWallet();

  useEffect(() => {
    if (assets.length === 0 && isLoading === false) {
      setLoading(true);
      (async () => {
        try {
          const response = await axios.get(`/api/user/${publicKey}`);
          setAssets(response.data.data);
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [assets, isLoading, publicKey]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loader}>
          <BiLoaderAlt />
        </div>
      ) : (
        assets
          .sort((elm) => elm.name)
          .map((asset) => {
            return (
              /* eslint-disable @next/next/no-img-element */
              // Must use img element because Image Next must be verify all external domains URL
              <div className={styles.element} key={asset.name}>
                <img src={asset.image} alt={asset.name} />
                <p>{asset.name}</p>
              </div>
            );
          })
      )}
    </div>
  );
}

Inventory.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
