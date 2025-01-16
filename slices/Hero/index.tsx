import { Content } from '@prismicio/client';
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from '@prismicio/react';
import { JSX } from 'react';

import { Bounded } from '@/components/Bounded';
import { ButtonLink } from '@/components/ButtonLink';
import { Heading } from '@/components/Heading';

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-brand-pink relative text-zinc-800 h-dvh overflow-hidden bg-texture"
    >
      <div className="absolute inset-0 mx-auto mt-24 max-w-6xl px-6 ~my-10/16 grid grid-rows-[1fr,auto] place-items-end">
        <Heading size="lg" className="relative max-w-2xl place-self-start">
          <PrismicText field={slice.primary.heading} />
        </Heading>

        <div className="flex relative w-full flex-col lg:flex-row ~gap-2/4 items-center justify-between">
          <div className="max-w-[45ch] font-semibold ~text-lg/xl">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <ButtonLink
            field={slice.primary.button}
            icon="skateboard"
            size="lg"
            className="z-20 mt-2 block"
          >
            {slice.primary.button.text}
          </ButtonLink>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
