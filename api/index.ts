import { NowRequest, NowResponse } from "@vercel/node";

import cheerio from "cheerio";
import fetch from "node-fetch";

export default async function (req: NowRequest, res: NowResponse) {
  // return res.json({ message: "Hello World" });
  const { url } = req.query;

  const websiteData = await fetch(url);

  const $ = cheerio.load(await websiteData.text());

  const author = $("head [name=author]").attr();
  const twitterHandle = $("head [name='twitter:site']").attr() || null;

  res.status(200).json({
    author: author?.content,
    twitter: twitterHandle?.content,
  });
}
