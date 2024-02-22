import { ReactNode, createContext, useState } from "react";

interface SearchContextType {
  page: number;
  setPage: (query: number) => void;
}

export const PaginationContext = createContext<SearchContextType>({
  page: 1,
  setPage: () => {},
});

interface PaginationProviderProps {
  children: ReactNode;
}

export const PaginationProvider = ({ children }: PaginationProviderProps) => {
	const [page, setPage] = useState(1);

	return (
		<PaginationContext.Provider value={{ page, setPage }}>
			{children}
		</PaginationContext.Provider>
	)
}