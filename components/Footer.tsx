import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Bounded } from "./Bounded";
import { FooterPhysics } from "./FooterPhysics";
import { Logo } from "./Logo";

type Props = {};

export default async function Footer({}: Props) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  const boardTextureURLs = settings.data.footer_skateboards
    .map((item) => asImageSrc(item.skateboard, { h: 600 }))
    .filter((url): url is string => Boolean(url));

  return (
    <footer className="bg-texture overflow-hidden bg-zinc-900 text-white">
      <div className="relative h-[75vh] ~p-10/16 md:aspect-auto">
        {/* Background Image */}
        <PrismicNextImage
          field={settings.data.footer_image}
          alt=""
          width={1200}
          fill
          className="object-cover"
        />
        {/* Board Physics */}
        <FooterPhysics
          boardTextureURLs={boardTextureURLs}
          className="absolute inset-0 overflow-hidden"
        />
        {/* Logo */}
        <Logo className="pointer-events-none relative mix-blend-exclusion ~h-20/28" />
      </div>

      {/* Footer links */}
      <Bounded as="nav">
        <ul className="flex flex-wrap justify-center gap-8 ~text-lg/xl">
          {settings.data.navigation.map((item) => (
            <li key={item.link.text} className="hover:underline">
              <PrismicNextLink field={item.link} />
            </li>
          ))}
        </ul>
      </Bounded>
    </footer>
  );
}
