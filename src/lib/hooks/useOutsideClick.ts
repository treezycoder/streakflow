import { useEffect } from "react";

export function useOutsideClick({
  mainRef,
  exceptionRef,
  handler,
}: {
  mainRef: React.RefObject<
    HTMLElement | HTMLDivElement | HTMLButtonElement | null
  >;
  exceptionRef?: React.RefObject<
    HTMLElement | HTMLDivElement | HTMLButtonElement | null
  >;
  handler: () => void;
}) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (!mainRef.current) return;

      const clickedOutsideMain = !mainRef.current.contains(target);
      const clickedException =
        exceptionRef?.current && exceptionRef.current.contains(target);

      if (clickedOutsideMain && !clickedException) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mainRef, exceptionRef, handler]);
}
