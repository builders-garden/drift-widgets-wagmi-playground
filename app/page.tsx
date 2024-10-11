"use client";

import { useAccount, useWalletClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Code, monokai } from "react-code-blocks";
import { Button, Divider, Link } from "@nextui-org/react";
import { DriftOfframp, DriftOfframpModal } from "@buildersgarden/drift";
import { Github } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen min-w-screen text-black">
      <div className="flex flex-col gap-12 justify-center items-center px-48 py-24">
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
        <div className="text-4xl font-black">Drift Widgets Playground</div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <ConnectButton />
          {isConnected && (
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className=" w-fit">
                <DriftOfframp walletClient={walletClient as never} />
              </div>
              <Button
                onClick={() => setIsOpen(true)}
                color="primary"
                className="w-full"
              >
                Open Offramp Modal Version
              </Button>

              <DriftOfframpModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                walletClient={walletClient as never}
              />
            </div>
          )}
        </div>
        <Divider className="w-1/3" />
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="text-xl font-bold">How to use</div>
          <Code
            text={"yarn add @buildersgarden/drift"}
            language={"tsx"}
            showLineNumbers={false}
            theme={monokai}
          />
          <Code
            text={
              "import {DriftOfframp, DriftProvider} from '@buildersgarden/drift'"
            }
            language={"tsx"}
            showLineNumbers={false}
            theme={monokai}
          />
          <Code
            text={
              "<DriftProvider appId={'id'} appSecret={'secret'}>\n   /* ... */\n   <DriftOfframp walletClient={walletClient} />\n   /* ... */\n<DriftProvider/>"
            }
            language={"tsx"}
            showLineNumbers={false}
            theme={monokai}
          />
        </div>
      </div>
    </div>
  );
}
