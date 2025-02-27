import { BsNintendoSwitch, BsBrowserChrome } from "react-icons/bs";
import {
  FaAndroid,
  FaApple,
  FaAppStoreIos,
  FaLinux,
  FaPlaystation,
  FaWindows,
  FaXbox,
} from "react-icons/fa";
import { SiAtari, SiSega } from "react-icons/si";

const platformIcons = {
  PC: FaWindows,
  PlayStation: FaPlaystation,
  Xbox: FaXbox,
  Linux: FaLinux,
  ["Apple Macintosh"]: FaApple,
  Nintendo: BsNintendoSwitch,
  Android: FaAndroid,
  iOS: FaAppStoreIos,
  Web: BsBrowserChrome,
  Atari: SiAtari,
  SEGA: SiSega,
};

export type PlatformType = keyof typeof platformIcons;

export default platformIcons;
