import { useEffect } from "react";
import { startMenuMusic, stopMenuMusic } from "../utils/audio/player";

export function useMenuMusic(enabled: boolean) {
  useEffect(() => {
    if (enabled) void startMenuMusic();
    else void stopMenuMusic();

    return () => {
      void stopMenuMusic();
    };
  }, [enabled]);
}
