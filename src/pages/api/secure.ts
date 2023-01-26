import type { NextApiRequest, NextApiResponse } from "next";

export default async function secure(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(400).json({ msg: "only GET request method" });
  }

  const data = await fetch("https://danielcodex.com/wp-json/wp/v2/posts");
  const post = await data.json();

  res.status(200).json(post);
}
