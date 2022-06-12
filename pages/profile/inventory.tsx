import Layout from "../../components/dashboard/profile/layout";
import styles from "../../styles/pages/Profile.module.scss";
import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { Connection, PublicKey } from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";

export default function Inventory() {
  const [assets, setAssets] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect");
    const fetchData = async () => {
      const response = await axios.post(`https://api.mainnet-beta.solana.com`, {
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenAccountsByOwner",
        params: [
          "",
          {
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            encoding: "jsonParsed",
          },
        ],
      });
      const values = response.data.result.value;

      return values.reduce(function (acc: any, value: any) {
        const isBalanceNotZero =
          +value.account.data.parsed.info.tokenAmount.amount > 0;
        console.log(value.account.data.parsed.info.tokenAmount.amount);
        console.log(value.account.data.parsed.info.mint);
        if (isBalanceNotZero) {
          acc.push(new PublicKey(value.account.data.parsed.info.mint));
        }
        return acc;
      }, []);
    };

    console.log("fetchData");
    const data = fetchData();
  }, []);

  return <div className={styles.container}>Inventory</div>;
}

Inventory.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
