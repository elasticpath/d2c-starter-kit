import { getCatalogReleaseById } from "../../services/catalog";
import { NextApiRequest, NextApiResponse } from "next";
import zlib from "zlib";
import util from "util";
const gunzip = util.promisify(zlib.gunzip);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const catalogId = req.body.payload.attributes.catalog_id;
    const releaseId = req.body.payload.id;
    const releaseResp = await getCatalogReleaseById(catalogId, releaseId);
    const deltaFileUrl = releaseResp.data.relationships.delta.links.related;

    const deltaFileResp = await fetch(deltaFileUrl);
    const arrayBuffer = await deltaFileResp.arrayBuffer();
    const unzipped = await gunzip(arrayBuffer);
    const productsArr = unzipped.toString().split("\n");
    for (const str of productsArr) {
      if (str) {
        const product = JSON.parse(str);
        await res.revalidate(`/products/${product.id}`);
      }
    }

    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
}
