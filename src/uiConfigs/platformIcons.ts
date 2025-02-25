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

export default {
  PC: FaWindows,
  PlayStation: FaPlaystation,
  Xbox: FaXbox,
  Linux: FaLinux,
  ["Apple Macintosh"]: FaApple,
  Nintendo: BsNintendoSwitch,
  Android: FaAndroid,
  iOS: FaAppStoreIos,
  Web: BsBrowserChrome,
};
