import type {
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";
import type {
  IconMotionElement,
  IconMotionEventDetail,
} from "../web-component/icon-motion.js";

export interface IconMotionProps extends Omit<HTMLAttributes<HTMLElement>, "onPause" | "onPlay"> {
  accent?: string;
  autoplay?: boolean;
  background?: string;
  bar?: string;
  className?: string;
  duration?: number;
  foreground?: string;
  label?: string;
  light?: string;
  loop?: boolean;
  muted?: string;
  paused?: boolean;
  presentation?: "inline" | "cinematic";
  reducedMotion?: "allow";
  resultLabel?: string;
  secondaryLabel?: string;
  shadow?: string;
  style?: CSSProperties;
  tertiaryLabel?: string;
  onMotionComplete?: (event: CustomEvent<IconMotionEventDetail>) => void;
  onMotionLoop?: (event: CustomEvent<IconMotionEventDetail>) => void;
  onMotionPause?: (event: CustomEvent<IconMotionEventDetail>) => void;
  onMotionPlay?: (event: CustomEvent<IconMotionEventDetail>) => void;
  onMotionReady?: (event: CustomEvent<IconMotionEventDetail>) => void;
  onMotionSeek?: (event: CustomEvent<IconMotionEventDetail>) => void;
}

export const IconMotion: ForwardRefExoticComponent<
  IconMotionProps & RefAttributes<IconMotionElement>
>;
export default IconMotion;
