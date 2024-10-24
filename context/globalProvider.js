import { createContext, useEffect, useContext, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const globalContext = createContext();
export const useGlobalContext = () => useContext(globalContext);

 const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCurrentUser().then((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setLoading(false);
  })}, []);

  return <globalContext.Provider value={{
    isLoggedIn,
    user,
    loading,
    setIsLoggedIn,
    setUser,
    setLoading
  }}>{children}</globalContext.Provider>;
};


export default GlobalProvider;
