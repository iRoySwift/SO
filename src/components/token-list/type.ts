export const TAB_TYPE = {
  tokens: "tokens",
  nfts: "nfts",
} as const;

export type TabType = (typeof TAB_TYPE)[keyof typeof TAB_TYPE];
