import CONSTANTS from "../../../constants";
import { Collections } from "../../../types/metadata";
import { getAllTokens, getTokenMetadata } from "../../../utils/metadata";

import type { NextApiRequest, NextApiResponse } from "next";

const {
  ERRORS: { INTERNAL_SERVER_ERROR },
  METHODS: { GET },
} = CONSTANTS;

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { pubKey },
      method,
    } = req;

    if (method === GET) {
      const mintKeys = await getAllTokens(pubKey.toString());
      const data: Collections = await getTokenMetadata(mintKeys);
      res.status(200).json(data);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
}
