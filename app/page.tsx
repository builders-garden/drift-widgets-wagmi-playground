"use client";

import { useAccount, useWalletClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button, Divider, Link, Tab, Tabs } from "@nextui-org/react";
import {
  DriftOfframp,
  DriftOfframpModal,
  DriftPay,
} from "@buildersgarden/drift";
import { Book, Github } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { base } from "viem/chains";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen min-w-screen text-black">
      <div className="flex flex-col gap-8 sm:gap-12 justify-center items-center px-4 sm:px-8 md:px-16 lg:px-48 py-12 sm:py-24">
        <div className="flex flex-row gap-4 justify-center items-center">
          <Link
            href="https://github.com/builders-garden/drift-widgets-wagmi-playground/"
            target="_blank"
          >
            <Button
              radius="sm"
              size="sm"
              className="text-black border-black"
              variant="bordered"
              startContent={<Github className="w-4 h-4" />}
            >
              Github
            </Button>
          </Link>
          <Link
            href="https://builders-garden.notion.site/Drift-SDK-Documentation-120679ed099e80e3a31aeb1567e79d12"
            target="_blank"
          >
            <Button
              radius="sm"
              size="sm"
              className="text-black border-black"
              variant="bordered"
              startContent={<Book className="w-4 h-4" />}
            >
              Docs
            </Button>
          </Link>
        </div>
        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-center">
          Drift Widgets Playground
        </div>
        <div className="flex flex-col gap-4 justify-center items-center w-full max-w-md">
          <ConnectButton />
          {isConnected && (
            <Tabs aria-label="Options">
              <Tab key="offramp" title="Offramp">
                <div className="flex flex-col gap-4 justify-center items-center w-full">
                  <div className="w-full">
                    <DriftOfframp walletClient={walletClient as never} />
                  </div>
                  <Button
                    onClick={() => setIsOpen(true)}
                    className="w-full bg-black text-white"
                  >
                    Open Offramp Modal Version
                  </Button>

                  <DriftOfframpModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    walletClient={walletClient as never}
                  />
                </div>
                <Divider className="w-1/3 max-w-md" />
                <Image
                  src="/images/code.svg"
                  alt="Drift Widgets Code"
                  className="w-full max-w-[300px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[650px] h-auto"
                  width={700}
                  height={700}
                />
              </Tab>
              <Tab key="pay" title="Pay">
                <DriftPay
                  walletClient={walletClient as never}
                  paymentDetails={{
                    amount: 1,
                    destinationTokenAddress:
                      "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
                    destinationTokenChainId: base.id,
                    recipientAddress: walletClient?.account
                      .address as `0x${string}`,
                  }}
                  buttonText="Pay"
                  onSuccess={(txHash: string) => {
                    const params = new URLSearchParams({
                      txHash,
                      txExplorerUrl: `https://basescan.org/tx/${txHash}`,
                      recipient: walletClient?.account.address || "",
                    });
                    // router.push(
                    //   `https://x.com/limone_eth?${params.toString()}`
                    // );
                    console.log("onSuccess", params.toString());
                  }}
                />
                <Image
                  src="/images/pay-code.svg"
                  alt="Drift Pay Code"
                  className="w-full max-w-[300px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[650px] h-auto"
                  width={700}
                  height={700}
                />
              </Tab>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}
