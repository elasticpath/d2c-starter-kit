import { getCatalogReleaseById } from "../../services/catalog";
import { unzipBlobToString } from "../../lib/unzipBlobToString";

// @ts-ignore
export default async function handler(req: any, res: any) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const catalogId = req.body.payload.attributes.catalog_id;
    const releaseId = req.body.payload.id;
    const releaseResp = await getCatalogReleaseById(catalogId, releaseId);
    //@ts-ignore
    const deltaFileUrl = releaseResp.data.relationships.delta.links.related;
    const resp = await fetch(deltaFileUrl);
    const blob = await resp.blob();
    const unzipped = await unzipBlobToString(blob);
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
