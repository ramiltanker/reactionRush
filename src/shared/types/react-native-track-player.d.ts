import "react-native-track-player";

declare module "react-native-track-player" {
  export interface Track {
    url: string | number;
  }
}
