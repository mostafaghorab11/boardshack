import { ButtonLink } from "@/components/ButtonLink";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { SkaterScribble } from "./SkaterScribble";

type Props = {
  skater: Content.SkaterDocument;
  index: number;
};

export default function Skater({ skater, index }: Props) {
  const colors = [
    "text-brand-blue",
    "text-brand-lime",
    "text-brand-purple",
    "text-brand-orange",
  ];
  const scribbleColor = colors[index];
  return (
    <div className="skater group relative flex flex-col items-center gap-4">
      <div className="stack-layout overflow-hidden">
        <PrismicNextImage
          field={skater.data.background_image}
          width={500}
          alt=""
          className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[.8]"
          imgixParams={{ q: 0.2 }}
        />
        <SkaterScribble className={clsx("relative", scribbleColor)} />
        <PrismicNextImage
          field={skater.data.foreground_image}
          width={500}
          alt=""
          className="transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
        />
        <div className="relative grid h-48 w-full place-self-end bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <h3 className="relative grid place-self-end justify-self-start p-2 font-sans text-brand-gray ~text-2xl/3xl">
          <span className="mb-[-.3em] block">{skater.data.first_name}</span>
          <span className="block">{skater.data.last_name}</span>
        </h3>
      </div>
      <ButtonLink size="sm" field={skater.data.customization_button}>
        {skater.data.customization_button.text}
      </ButtonLink>
    </div>
  );
}
