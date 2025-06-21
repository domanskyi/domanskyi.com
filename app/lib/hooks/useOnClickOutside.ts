import React, { useEffect } from "react";

const useOnClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOnClickOutside;
