import { useContext } from "react";

import { PaginationContext } from "./PaginationProvider";

export const usePagination = () => useContext(PaginationContext);