import { makeVar, useReactiveVar } from "@apollo/client";
import { useCallback } from "react";

type LocalUser = {
  name?: string;
  id?: string

}
const defaultUser: LocalUser  = {};

const userVar = makeVar<LocalUser>(defaultUser)

// Since we are quering from local state, we can "safely" use ! operator
export const useLocalData = (): [LocalUser, (user: LocalUser)=>void] => {
  const data = useReactiveVar(userVar)
  const setData = useCallback((newData: LocalUser)=> {
    userVar(newData)
  },[])
  return [data, setData];
};
