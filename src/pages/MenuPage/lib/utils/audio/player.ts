import TrackPlayer, { RepeatMode } from "react-native-track-player";

import menu1 from "../../../../../shared/assets/audio/Beauty(chosic.com).mp3";
import menu2 from "../../../../../shared/assets/audio/Transcendence-chosic.com_.mp3";

let initialized = false;

async function initPlayer() {
  if (initialized) return;
  await TrackPlayer.setupPlayer();
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  initialized = true;
}

export async function startMenuMusic() {
  await initPlayer();

  await TrackPlayer.reset();

  await TrackPlayer.add({
    id: "menu1",
    url: menu1 as unknown as string,
    title: "Menu 1",
    artist: "Reaction Rush",
  });

  await TrackPlayer.add({
    id: "menu2",
    url: menu2 as unknown as string,
    title: "Menu 2",
    artist: "Reaction Rush",
  });

  await TrackPlayer.play();
}

export async function stopMenuMusic() {
  try {
    await TrackPlayer.stop();
  } catch (err) {
    console.log(err);
  }
}
