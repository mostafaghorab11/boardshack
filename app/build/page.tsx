import { ButtonLink } from "@/components/ButtonLink";
import { Heading } from "@/components/Heading";
import { Logo } from "@/components/Logo";
import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";
import Link from "next/link";
import { CustomizerControlsProvider } from "./context";
import Controls from "./Controls";
import Preview from "./Preview";

export default async function page() {
  const client = createClient();
  const customizerSettings = await client.getSingle("board_customizer");
  const { wheels, decks, metals } = customizerSettings.data;

  const defaultWheel = wheels[0];
  const defaultDeck = decks[0];
  const defaultBolt = metals[0];
  const defaultTruck = metals[0];

  const wheelTextureURLs = wheels
    .map((texture) => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url));

  const deckTextureURLs = decks
    .map((texture) => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url));

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <CustomizerControlsProvider
        defaultWheel={defaultWheel}
        defalutDeck={defaultDeck}
        defaultbolt={defaultBolt}
        defaulttruck={defaultTruck}
      >
        <div className="relative aspect-square shrink-0 bg-[#3A414A] lg:aspect-auto lg:grow">
          <div className="absolute inset-0">
            <Preview
              wheelTextureURLs={wheelTextureURLs}
              deckTextureURLs={deckTextureURLs}
            />
          </div>
          <Link href="/" className="absolute left-6 top-6">
            <Logo className="h-12 text-white" />
          </Link>
        </div>
        <div className="bg-texture grow bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
          <Heading as="h1" size="sm" className="mb-6 mt-0">
            Build Your Board
          </Heading>
          <Controls
            wheels={wheels}
            decks={decks}
            metals={metals}
            className="mb-6"
          />
          <ButtonLink href="" icon="plus" color="lime">
            Add to cart
          </ButtonLink>
        </div>
      </CustomizerControlsProvider>
    </div>
  );
}