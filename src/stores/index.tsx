import React, { createContext, useContext } from "react";
import GearStore from "./gearStore";

const StoreContext = createContext({ GearStore });

export const StoreProvider = ({ children }) => {
  return <StoreContext.Provider value={{ GearStore }}>{children}</StoreContext.Provider>;
};

export const useStores = () => {
  return useContext(StoreContext);
};
