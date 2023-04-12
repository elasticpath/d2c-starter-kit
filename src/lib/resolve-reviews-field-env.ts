export const reviewsEnv = resolveReviewsEnv();

function resolveReviewsEnv(): {
  enable: boolean;
  avgRatingField: string;
  reviewCountField: string;
} {
  const { enable, avgRatingField, reviewCountField } = {
    enable: process.env.NEXT_PUBLIC_ENABLE_RATING == "true",
    avgRatingField: process.env.NEXT_PUBLIC_ALGOLIA_AVG_RATING_FIELD || "",
    reviewCountField: process.env.NEXT_PUBLIC_ALGOLIA_REVIEW_COUNT_FIELD || "",
  };

  return { enable, avgRatingField, reviewCountField };
}
