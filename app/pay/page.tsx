"use client";
import { DriftPay } from "@buildersgarden/drift";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { base } from "viem/chains";
import { useAccount, useWalletClient } from "wagmi";
import { useState } from "react";
import { Button, Divider } from "@nextui-org/react";
import Image from "next/image";

export default function Page() {
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [selectedToken, setSelectedToken] = useState(
    "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
  );

  return (
    <div className="min-h-screen min-w-screen text-black">
      <div className="flex flex-col gap-2 sm:gap-8 justify-center items-center px-4 sm:px-8 md:px-16 lg:px-48 py-12 sm:py-24">
        <ConnectButton />
        {isConnected && (
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="text-2xl font-semibold mb-4">
              Select token to receive
            </div>
            <div className="flex gap-4">
              <Button
                className={`px-4 py-2 text-white rounded transition-opacity duration-300 ${
                  selectedToken === "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
                    ? "bg-blue-500 opacity-100"
                    : "bg-blue-500 opacity-50 hover:opacity-75"
                }`}
                onClick={() =>
                  setSelectedToken("0x833589fcd6edb6e08f4c7c32d4f71b54bda02913")
                }
              >
                USDC on Base
              </Button>
              <Button
                className={`px-4 py-2 text-white rounded transition-opacity duration-300 ${
                  selectedToken === "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85"
                    ? "bg-red-500 opacity-100"
                    : "bg-red-500 opacity-50 hover:opacity-75"
                }`}
                onClick={() =>
                  setSelectedToken("0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85")
                }
              >
                USDC on Optimism
              </Button>
            </div>

            <DriftPay
              walletClient={walletClient as never}
              paymentDetails={{
                amount: 10,
                destinationTokenAddress: selectedToken as `0x${string}`,
                destinationTokenDecimals:
                  selectedToken === "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
                    ? 6
                    : 18,
                destinationTokenChainId: base.id,
                recipientAddress: walletClient?.account
                  .address as `0x${string}`,
              }}
            />
          </div>
        )}
        <Divider className="w-1/3 max-w-md" />
        <Image
          src="/images/pay-code.svg"
          alt="Drift Widgets Pay Code"
          className="w-full max-w-[300px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[650px] h-auto"
          width={700}
          height={700}
        />
      </div>
    </div>
  );
}
