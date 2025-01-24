"use client";

import { Heading } from "@/components/Heading";
import {
  ColorField,
  Content,
  ImageField,
  KeyTextField,
} from "@prismicio/client";
import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";
import { useCustomizerControls } from "./context";

type Props = Pick<
  Content.BoardCustomizerDocumentData,
  "wheels" | "decks" | "metals"
> & { className?: string };

export default function Controls({ wheels, decks, metals, className }: Props) {
  const {
    setBolt,
    setDeck,
    setTruck,
    setWheel,
    selectedBolt,
    selectedDeck,
    selectedTruck,
    selectedWheel,
  } = useCustomizerControls();
  return (
    <div className={clsx("flex flex-col gap-6", className)}>
      <Options title="Deck" selectedName={selectedDeck?.uid}>
        {decks.map((deck) => (
          <Option
            key={deck.uid}
            onClick={() => setDeck(deck)}
            selected={selectedDeck?.uid === deck.uid}
            imageField={deck.texture}
            imgixParams={{
              rect: [20, 1500, 1000, 1000],
              width: 150,
              height: 150,
            }}
          >
            {deck.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Wheels" selectedName={selectedWheel?.uid}>
        {wheels.map((wheel) => (
          <Option
            key={wheel.uid}
            onClick={() => setWheel(wheel)}
            selected={selectedWheel?.uid === wheel.uid}
            imageField={wheel.texture}
            imgixParams={{
              rect: [20, 10, 850, 850],
              width: 150,
              height: 150,
            }}
          >
            {wheel.uid}
          </Option>
        ))}
      </Options>
      <Options title="Trucks" selectedName={selectedTruck?.uid}>
        {metals.map((metal) => (
          <Option
            key={metal.uid}
            colorField={metal.color}
            onClick={() => setTruck(metal)}
            selected={selectedTruck?.uid === metal.uid}
          >
            {metal.uid}
          </Option>
        ))}
      </Options>
      <Options title="Bolts" selectedName={selectedBolt?.uid}>
        {metals.map((metal) => (
          <Option
            key={metal.uid}
            colorField={metal.color}
            onClick={() => setBolt(metal)}
            selected={selectedBolt?.uid === metal.uid}
          >
            {metal.uid}
          </Option>
        ))}
      </Options>
    </div>
  );
}

type OptionsProps = {
  title?: ReactNode;
  selectedName?: KeyTextField;
  children?: ReactNode;
};

function Options({ title, selectedName, children }: OptionsProps) {
  const formatedName = selectedName?.replace(/-/g, " ");

  return (
    <div>
      <div className="flex">
        <Heading as="h2" size="xs" className="mb-2">
          {title}
        </Heading>
        <p className="ml-3 text-zinc-300">
          <span className="select-none text-zinc-500">| </span>
          {formatedName}
        </p>
      </div>
      <ul className="mb-1 flex flex-wrap gap-2">{children}</ul>
    </div>
  );
}

type OptionProps = Omit<ComponentProps<"button">, "children"> & {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
} & (
    | {
        imageField: ImageField;
        imgixParams?: PrismicNextImageProps["imgixParams"];
        colorField?: never;
      }
    | {
        colorField: ColorField;
        imageField?: never;
        imgixParams?: never;
      }
  );

function Option({
  onClick,
  selected,
  children,
  imageField,
  imgixParams,
  colorField,
}: OptionProps) {
  return (
    <li>
      <button
        onClick={onClick}
        className={clsx(
          "size-10 cursor-pointer rounded-full bg-black p-0.5 outline-2 outline-white",
          selected && "outline",
        )}
      >
        {imageField ? (
          <PrismicNextImage
            field={imageField}
            imgixParams={imgixParams}
            className="pointer-events-none h-full w-full rounded-full"
            alt=""
          />
        ) : (
          <div
            className="h-full w-full rounded-full"
            style={{ backgroundColor: colorField ?? undefined }}
          ></div>
        )}
        <span className="sr-only">{children}</span>
      </button>
    </li>
  );
}