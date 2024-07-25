import { createContext } from "react";

export const SelectCategory = createContext<{
	category: string;
	setCategory: (category: string) => void;
}>({
	category: "",
	setCategory: () => {},
});
