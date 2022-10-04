import { getCatalogReleaseById } from "../../services/catalog";
import { unzipBlobToString } from "../../lib/unzipBlobToString";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  let deltaFileResp, fileBlob, unzipped, productsArr;
  try {
    const catalogId = req.body.payload.attributes.catalog_id;
    const releaseId = req.body.payload.id;
    const releaseResp = await getCatalogReleaseById(catalogId, releaseId);
    const deltaFileUrl = releaseResp.data.relationships.delta.links.related;
    deltaFileResp = await fetch(deltaFileUrl);
    fileBlob = await deltaFileResp.blob();
    unzipped = await unzipBlobToString(fileBlob);
    productsArr = unzipped.split("\n");
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
      deltaFileResp,
      fileBlob,
      unzipped,
      productsArr,
    });
  }
}
