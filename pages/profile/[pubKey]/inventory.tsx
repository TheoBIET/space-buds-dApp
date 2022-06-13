import Layout from "../../../components/dashboard/profile/layout";
import styles from "../../../styles/pages/Inventory.module.scss";
import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { Collections } from "../../../types/metadata";

import { BiLoaderAlt } from "react-icons/bi";
import { useRouter } from "next/router";


export default function Inventory() {
  const router = useRouter();
  const [collections, setCollections] = useState<Collections>({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const publicKey = router.query.pubKey;
    if (Object.keys(collections).length === 0 && isLoading === false) {
      setLoading(true);
      (async () => {
        try {
          const response = await axios.get(`/api/user/${publicKey}`);
          setCollections(response.data);
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [collections, isLoading, router]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loader}>
          <BiLoaderAlt />
        </div>
      ) : (
        Object.keys(collections).map((key) => {
          return (
            /* eslint-disable @next/next/no-img-element */
            // Must use img element because Image Next must be verify all external domains URL
            <div className={styles.element} key={key}>
              <img
                src={collections[key][0].image}
                alt={collections[key][0].name.split('#')[0]}
              />
              <div className={styles.collectionName}>{collections[key][0].name.split('#')[0]}</div>
            </div>
          );
        })
      )}
    </div>
  );
}

Inventory.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
