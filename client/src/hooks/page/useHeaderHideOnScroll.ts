import { useEffect } from "react";

export const useHeaderHideOnScroll = () => {
  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const header = document.querySelector(".header-container");

      if (header) {
        if (scrollTop > lastScrollTop) {
          header.classList.add("hidden");
        } else {
          header.classList.remove("hidden");
        }
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};

export default useHeaderHideOnScroll;