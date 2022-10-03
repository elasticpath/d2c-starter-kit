import { getCatalogReleaseById } from "../../services/catalog";
import { unzipBlobToJson } from "../../lib/unzipBlobToJson";

// @ts-ignore
export default async function handler(req: any, res: any) {
  // Check for secret to confirm this is a valid request
  /*  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }*/

  try {
    const catalogId = req.body.payload.attributes.catalog_id;
    const releaseId = req.body.payload.id;
    const releaseResp = await getCatalogReleaseById(catalogId, releaseId);
    //@ts-ignore
    const deltaFileUrl = releaseResp.data.relationships.delta.links.related;
    const resp = await fetch(deltaFileUrl);
    const blob = await resp.blob();
    const json = await unzipBlobToJson(blob);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
