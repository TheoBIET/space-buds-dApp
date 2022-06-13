import type { NextApiRequest, NextApiResponse } from "next";
import type { IUser } from "../../../types/user";
import CONSTANTS from "../../../constants";
const {
  METHODS: { GET, POST, PUT },
} = CONSTANTS;

import services from "../../../services";
const { getUser, createUser, updateUser } = services.userServices;

export default function UserHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {
    query: { pubKey },
    method,
  } = req;

  switch (method) {
    case GET:
      getUser(pubKey as string)
        .then((user) => {
          res.status(200).json(user as IUser);
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });
      break;
    case POST:
      createUser({
        publicKey: pubKey as string,
        username: req.body.username,
        description: req.body.description,
      } as IUser)
        .then((user) => {
          res.status(200).json(user as IUser);
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });
      break;
    case PUT:
      updateUser({
        publicKey: pubKey as string,
        username: req.body.username,
        description: req.body.description,
      } as IUser)
        .then((user) => {
          res.status(200).json(user as IUser);
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });
      break;
    default:
      res.status(404).json({ error: "Method not found" });
  }
}
