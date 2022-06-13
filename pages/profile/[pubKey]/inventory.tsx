import Layout from "../../../components/dashboard/profile/layout";
import styles from "../../../styles/pages/Inventory.module.scss";
import type { MetadataNFT, Collections } from "../../../types/metadata";
import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { useRouter } from "next/router";

import { useWalletNfts } from "@nfteyez/sol-rayz-react";
import { BiArrowBack, BiLoaderAlt } from "react-icons/bi";

export default function Inventory() {
  const router = useRouter();
  const publicAddress = router.query.pubKey;
  const [assets, setAssets] = useState({} as Collections);
  const [selectedCollectionIndex, setSelectedCollectionIndex] = useState("");
  const { nfts, isLoading } = useWalletNfts({
    publicAddress: `${publicAddress}`,
  });

  const getNftTokenData = async () => {
    try {
      const data: Collections = {};
      // Prevent error when fetching .txt metadata
      for (const nft of nfts.filter(
        (nft) => nft.data.uri.split(".").at(-1) !== "txt"
      )) {
        const metadata = await axios.get(nft.data.uri);
        const { name, symbol, image, attributes, external_url } = metadata.data;
        console.log(metadata.data);
        const cleanData: MetadataNFT = {
          name,
          symbol: symbol || name.split('').splice(0, 3).join('').toUpperCase(),
          image,
          attributes,
          external_url,
        };
        console.log(cleanData);

        // Add the token to the collection
        if (!data[cleanData.symbol]) {
          data[cleanData.symbol] = [{ ...cleanData }];
        } else {
          data[cleanData.symbol] = [...data[cleanData.symbol], { ...cleanData }];
        }
      }
      setAssets(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (nfts.length > 0) {
      getNftTokenData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nfts]);

  if (!selectedCollectionIndex) {
    return (
      <div className={styles.container}>
        {isLoading ? (
          <div className={styles.loader}>
            <BiLoaderAlt />
          </div>
        ) : (
          Object.keys(assets).map((key) => {
            return (
              /* eslint-disable @next/next/no-img-element */
              // Must use img element because Image Next must be verify all external domains URL
              <div className={styles.element} key={key}>
                <img
                  onClick={() =>
                    setSelectedCollectionIndex(assets[key][0].symbol)
                  }
                  src={assets[key][0].image}
                  alt={assets[key][0].name.split("#")[0]}
                />
                <div className={styles.collectionName}>
                  {assets[key][0].name.split("#")[0]} ({assets[key].length})
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }

  return (
    <>
      <div className={styles.arrowBack}>
        <BiArrowBack />
        <span onClick={() => setSelectedCollectionIndex("")}>Back to collections</span>
      </div>
      <div className={styles.container}>
        {assets[selectedCollectionIndex].map((asset) => {
          return (
            /* eslint-disable @next/next/no-img-element */
            // Must use img element because Image Next must be verify all external domains URL
            <div className={styles.element} key={asset.name}>
              <img src={asset.image} alt={asset.name} />
              <div className={styles.collectionName}>{asset.name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

Inventory.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
