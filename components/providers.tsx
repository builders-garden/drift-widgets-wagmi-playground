"use client";

import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/wagmi";
import { DriftProvider } from "@buildersgarden/drift";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <DriftProvider
              appId={process.env.NEXT_PUBLIC_DRIFT_APP_ID as string}
              appSecret={process.env.NEXT_PUBLIC_DRIFT_APP_SECRET as string}
            >
              <main className="h-full">{children}</main>
            </DriftProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </NextUIProvider>
  );
}
