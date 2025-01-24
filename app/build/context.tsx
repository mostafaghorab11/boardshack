"use client";
import { Content } from "@prismicio/client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type CustomizerControlsContext = {
  selectedWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  setWheel: (wheel: Content.BoardCustomizerDocumentDataWheelsItem) => void;
  selectedDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  setDeck: (deck: Content.BoardCustomizerDocumentDataDecksItem) => void;
  selectedBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
  setBolt: (bolts: Content.BoardCustomizerDocumentDataMetalsItem) => void;
  selectedTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
  setTruck: (trucks: Content.BoardCustomizerDocumentDataMetalsItem) => void;
};

const defaultContext: CustomizerControlsContext = {
  setWheel: () => {},
  setDeck: () => {},
  setBolt: () => {},
  setTruck: () => {},
};

const CustomizerControlsContext = createContext(defaultContext);

type CustomizerControlsProviderProps = {
  children?: ReactNode;
  defaultWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  defalutDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  defaultbolt?: Content.BoardCustomizerDocumentDataMetalsItem;
  defaulttruck?: Content.BoardCustomizerDocumentDataMetalsItem;
};

export function CustomizerControlsProvider({
  children,
  defaultWheel,
  defalutDeck,
  defaultbolt,
  defaulttruck,
}: CustomizerControlsProviderProps) {
  const [selectedWheel, setWheel] = useState(defaultWheel);
  const [selectedDeck, setDeck] = useState(defalutDeck);
  const [selectedBolt, setBolt] = useState(defaultbolt);
  const [selectedTruck, setTruck] = useState(defaulttruck);

  const value = useMemo<CustomizerControlsContext>(() => {
    return {
      selectedWheel,
      setWheel,
      selectedDeck,
      setDeck,
      selectedBolt,
      setBolt,
      selectedTruck,
      setTruck,
    };
  }, [selectedWheel, selectedDeck, selectedBolt, selectedTruck]);
  return (
    <CustomizerControlsContext value={value}>
      {children}
    </CustomizerControlsContext>
  );
}

export function useCustomizerControls() {
  return useContext(CustomizerControlsContext);
}
