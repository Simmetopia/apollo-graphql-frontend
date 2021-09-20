import { makeVar, useReactiveVar } from "@apollo/client";

type LocalUser = {
  name?: string;
  id?: string

}
const defaultUser: LocalUser  = {};

const userVar = makeVar<LocalUser>(defaultUser)




// Since we are quering from local state, we can "safely" use ! operator
export const useLocalData = () => {
  const data = useReactiveVar(userVar)
  return data;
};
