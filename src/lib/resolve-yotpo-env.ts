export const yotpoEnv = resolveYotpoEnv();

function resolveYotpoEnv(): {
  enable: boolean;
  appKey?: string;
} {
  const { enable, appKey } = {
    enable: process.env.NEXT_PUBLIC_ENABLE_YOTPO == "true",
    appKey: process.env.NEXT_PUBLIC_YOTPO_APP_KEY,
  };

  if (enable && !appKey) {
    throw new Error(
      `Failed to get Yotpo environment variables appKey: ${appKey}\n Make sure you have set NEXT_PUBLIC_YOTPO_APP_KEY`
    );
  }

  return { enable, appKey };
}
