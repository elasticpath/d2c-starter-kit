import type { Promotion, Resource } from "@moltin/sdk";
import { EPCCAPI } from "./helper";

export async function getPromotionById(
  promotionId: string
): Promise<Resource<Promotion>> {
  return await EPCCAPI.Promotions.Get(promotionId);
}
