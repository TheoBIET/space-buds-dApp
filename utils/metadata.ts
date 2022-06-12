import CONSTANTS from "../constants";
const {
  SOLANA: {
    MAIN_NET,
    PROGRAM_ID,
    JSON_RPC,
    JSON_PARSED,
    GET_TOKEN_ACCOUNTS_BY_OWNER,
    ID,
    SERUM_NET,
  },
} = CONSTANTS;
import { MetadataNFT, Collections } from "../types/metadata";
import { PublicKey } from "@solana/web3.js";
import { Connection, programs } from "@metaplex/js";
const { Metadata } = programs.metadata;
import axios from "axios";

// Filter tokens for keep only the ones that the balance is greater than 0
export const filterTokens = (tokens: any[]) => {
  return tokens.reduce(function (acc: any[], value: any) {
    const { amount } = value.account.data.parsed.info.tokenAmount;
    const isBalanceNotZero = +amount > 0;
    if (isBalanceNotZero) {
      acc.push(new PublicKey(value.account.data.parsed.info.mint));
    }
    return acc;
  }, []);
};

// Retrieve all SPL tokens in a wallet from the blockchain
export const getAllTokens = async (pubKey: string) => {
  const data = {
    jsonrpc: JSON_RPC,
    id: ID,
    method: GET_TOKEN_ACCOUNTS_BY_OWNER,
    params: [
      pubKey,
      {
        programId: PROGRAM_ID,
      },
      {
        encoding: JSON_PARSED,
      },
    ],
  };

  const response = await axios.post(MAIN_NET, data);
  return filterTokens(response.data.result.value);
};

// Retrieve all tokens metadata from the blockchain with Metaplex fundation
export const getTokenMetadata = async (mintKeys: PublicKey[]) => {
  const connection = new Connection(SERUM_NET);
  const data: Collections = {};

  // Get metadata for each token
  for (const mintKey of mintKeys) {
    try {
      const metadataPDA = await Metadata.getPDA(new PublicKey(mintKey));
      const tokenMetadata = await Metadata.load(connection, metadataPDA);
      const uriData = await axios.get(tokenMetadata.data.data.uri);
      const { name, symbol, image, attributes, external_url } = uriData.data;
      const cleanData: MetadataNFT = {
        name,
        symbol,
        image,
        attributes,
        external_url,
      };

      // Add the token to the collection
      if (!data[symbol]) {
        data[symbol] = [{ ...cleanData }];
      } else {
        data[symbol] = [...data[symbol], { ...cleanData }];
      }
    } catch (error) {
      continue;
    }
  }

  return data;
};
