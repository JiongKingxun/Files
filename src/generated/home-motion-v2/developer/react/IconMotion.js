import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import "../web-component/icon-motion.js";

const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export const IconMotion = forwardRef(function IconMotion(
  {
    accent,
    autoplay = false,
    background,
    bar,
    className,
    duration,
    foreground,
    label,
    light,
    loop = false,
    muted,
    onMotionComplete,
    onMotionLoop,
    onMotionPause,
    onMotionPlay,
    onMotionReady,
    onMotionSeek,
    paused = false,
    presentation = "inline",
    reducedMotion,
    resultLabel,
    secondaryLabel,
    shadow,
    style,
    tertiaryLabel,
    ...rest
  },
  forwardedRef,
) {
  const elementRef = useRef(null);
  useImperativeHandle(forwardedRef, () => elementRef.current, []);

  useBrowserLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;
    const listeners = {
      "motion-complete": onMotionComplete,
      "motion-loop": onMotionLoop,
      "motion-pause": onMotionPause,
      "motion-play": onMotionPlay,
      "motion-ready": onMotionReady,
      "motion-seek": onMotionSeek,
    };
    for (const [name, handler] of Object.entries(listeners)) {
      if (handler) element.addEventListener(name, handler);
    }
    return () => {
      for (const [name, handler] of Object.entries(listeners)) {
        if (handler) element.removeEventListener(name, handler);
      }
    };
  }, [
    onMotionComplete,
    onMotionLoop,
    onMotionPause,
    onMotionPlay,
    onMotionReady,
    onMotionSeek,
  ]);

  const motionStyle = { ...style };
  for (const [property, value] of [
    ["--accent", accent],
    ["--background", background],
    ["--bar", bar],
    ["--foreground", foreground],
    ["--light", light],
    ["--muted", muted],
    ["--shadow", shadow],
  ]) {
    if (value != null) motionStyle[property] = value;
  }
  if (duration != null) motionStyle["--duration"] = `${duration}ms`;
  motionStyle["--motion-iterations"] = loop ? "infinite" : "1";
  motionStyle["--motion-state"] = autoplay && !paused ? "running" : "paused";

  return React.createElement("home-icon-motion", {
    ...rest,
    ref: elementRef,
    className,
    style: motionStyle,
    accent,
    autoplay: autoplay ? "" : "false",
    background,
    bar,
    duration: duration == null ? undefined : String(duration),
    foreground,
    label,
    light,
    loop: loop ? "" : "false",
    muted,
    paused: paused ? "" : undefined,
    presentation,
    "reduced-motion": reducedMotion,
    "result-label": resultLabel,
    "secondary-label": secondaryLabel,
    shadow,
    "tertiary-label": tertiaryLabel,
  });
});

IconMotion.displayName = "IconMotion";

export default IconMotion;
