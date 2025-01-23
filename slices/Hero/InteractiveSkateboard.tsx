"use client";
import { Skateboard } from "@/components/Skateboard";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

type Props = {
  deckTextureURL: string;
  wheelTextureURL: string;
  boltColor: string;
  truckColor: string;
};

export default function InteractiveSkateboard({
  deckTextureURL,
  wheelTextureURL,
  boltColor,
  truckColor,
}: Props) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <Canvas
        className="min-h-[60rem] w-full"
        camera={{ position: [1.5, 1, 1.4], fov: 55 }}
      >
        <Suspense>
          <Scene
            deckTextureURL={deckTextureURL}
            wheelTextureURL={wheelTextureURL}
            boltColor={boltColor}
            truckColor={truckColor}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene({
  deckTextureURL,
  boltColor,
  truckColor,
  wheelTextureURL,
}: Props) {
  return (
    <group>
      <OrbitControls />
      <Environment files={"/hdr/warehouse-256.hdr"} />f
      <Skateboard
        deckTextureURL={deckTextureURL}
        deckTextureURLs={[deckTextureURL]}
        wheelTextureURL={wheelTextureURL}
        wheelTextureURLs={[wheelTextureURL]}
        boltColor={boltColor}
        truckColor={truckColor}
        constantWheelSpin
      />
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
    </group>
  );
}
