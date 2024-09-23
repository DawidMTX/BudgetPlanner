import { createContext } from "react";

export const TemporaryDataContext= createContext<{
	temporaryData: any;
	setTemporaryData: (temporaryData: any) => void;
}>({
	temporaryData: '',
	setTemporaryData: () => {},
});
