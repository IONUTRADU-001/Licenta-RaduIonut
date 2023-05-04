import React from "react";
import { data } from "autoprefixer";
import { Container } from "inversify";
import initialState, { ContextState } from "./state";
import { ContextAction, reducer } from "./reducer";

export interface ContextType {
  container: Container;
  children: React.ReactNode;
}

export type ContextDispatch = (action: ContextAction) => void;

const UserContext = React.createContext<ContextState | undefined>(undefined);
const Dispatch = React.createContext<ContextDispatch | undefined>(undefined);
export const InversifyContext = React.createContext<{ container: Container | null }>({ container: null });

const UserContextProvider: React.FC<ContextType> = ({ container, children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState());
  
  return (
    <InversifyContext.Provider value={{ container }}>
      <UserContext.Provider value={state}>
        <Dispatch.Provider value={dispatch}>
        {children}
        </Dispatch.Provider>
      </UserContext.Provider>
    </InversifyContext.Provider>
  );
}

function useContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
      throw new Error('useState must be used within a Context.Provider');
  }
  return context;
}

function useDispatch() {
  const context = React.useContext(Dispatch);
  if (context === undefined) {
      throw new Error('useDispatch must be used within a Dispatch.Provider');
  }
  return context;
}

export { UserContextProvider, useContext, useDispatch };
