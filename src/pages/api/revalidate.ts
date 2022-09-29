export default async function handler(req: any, res: any) {
  console.warn(req, "req");
  console.warn(res, "res");
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate("/products/23ff5935-25bc-4729-a770-8ff551e46188");
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
