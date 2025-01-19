import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

type Props = {
  backgroundImage: ImageField;
  foregroundImage: ImageField;
  className?: string;
};

export function ParallaxImage({
  backgroundImage,
  foregroundImage,
  className,
}: Props) {
  return (
    <div className={clsx("grid grid-cols-1 place-items-center", className)}>
      <div className="col-start-1 row-start-1 transition-transform">
        <PrismicNextImage field={backgroundImage} alt="" className="w-11/12" />
      </div>
      <div className="col-start-1 row-start-1 h-full w-full place-items-center transition-transform">
        <PrismicNextImage
          field={foregroundImage}
          alt=""
          imgixParams={{ height: 600 }}
          className="h-full max-h-[500px] w-auto"
        />
      </div>
    </div>
  );
}
