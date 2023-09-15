import { useLocation } from "react-router-dom";

export const usePaths = () => {
  const { pathname } = useLocation();
  const isCurrentPage = (link: string) => link === pathname;

  return { isCurrentPage };
};
