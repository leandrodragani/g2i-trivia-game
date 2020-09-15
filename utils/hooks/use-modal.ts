import { useCallback, useState } from "react";

export const useModal = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggle = useCallback(() => setIsVisible(!isVisible), [isVisible]);

  return {
    isVisible,
    toggle,
  };
};
