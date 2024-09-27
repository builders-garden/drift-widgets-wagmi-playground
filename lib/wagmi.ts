import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, baseSepolia } from "viem/chains";

export const config = getDefaultConfig({
  appName: "Drift Widget Playground",
  projectId: "YOUR_PROJECT_ID",
  chains: [base, baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
