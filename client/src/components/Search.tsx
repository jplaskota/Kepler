import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function Search() {
  const [open, setOpen] = useState(false);

  console.log(open);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button variant={"outline"} size={"icon"} onClick={() => setOpen(true)}>
        <MagnifyingGlassIcon />
      </Button>
    </>
  );
}