import React, { createContext, useState } from "react";


export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [correo, setCorreo] = useState(null);
  const [user, setUser] = useState(false);
  return (
    <AppContext.Provider
      value={{
        correo,
        setCorreo,
        user,
        setUser
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
