import { getCatalogReleaseById } from "../../services/catalog";
import { unzipBlobToString } from "../../lib/unzipBlobToString";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const catalogId = req.body.payload.attributes.catalog_id;
    const releaseId = req.body.payload.id;
    const releaseResp = await getCatalogReleaseById(catalogId, releaseId);
    const deltaFileUrl = releaseResp.data.relationships.delta.links.related;
    const deltaFileResp = await fetch(deltaFileUrl);
    const fileBlob = await deltaFileResp.blob();
    const unzipped = await unzipBlobToString(fileBlob);
    const productsArr = unzipped.split("\n");
    for (const str of productsArr) {
      if (str) {
        const product = JSON.parse(str);
        await res.revalidate(`/products/${product.id}`);
      }
    }
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
