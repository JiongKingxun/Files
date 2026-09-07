        # Generated Home Icon Motion · Developer Integration

        This package contains the Home icon motion from `../index.html`, packaged for an existing navigation button. The core Web Component has no runtime dependency, uses Shadow DOM for style isolation, and defaults to an in-place animation inside the fixed icon slot.

        ## Run the demo

        ```bash
        python3 -m http.server 4173 --directory developer
        ```

        Open `http://127.0.0.1:4173/`. A local server is required because the component is an ES module.

        ## Web Component

        Copy `developer/web-component/icon-motion.js` into the application and import it once:

        ```js
        import "./developer/web-component/icon-motion.js";
        ```

        ```html
        <home-icon-motion
          accent="#D0ED90"
          light="#F3FF0B"
          label="首页"
          result-label=""
          duration="5000"
          autoplay="false"
          loop="false"
          presentation="inline"
        ></home-icon-motion>
        ```

        Put the component where the existing static Home icon renders. Match that slot's dimensions:

        ```css
        .home-icon-motion {
          position: relative;
          z-index: 2;
          width: 24px;
          height: 24px;
          overflow: visible;
        }
        ```


## React

```jsx
import { useRef } from "react";
import { IconMotion } from "./developer/react/IconMotion.js";

export function HomeNavigationMotion() {
  const motion = useRef(null);
  return (
    <button type="button" aria-label="Home" onClick={() => motion.current?.restart()}>
      <IconMotion
        ref={motion}
        className="home-icon-motion"
        accent="#247CFF"
        light="#F3FF0B"
        label="Home"
        duration={5000}
        autoplay={false}
        loop={false}
        presentation="inline"
        aria-hidden="true"
        onMotionComplete={() => console.log("complete")}
      />
      <span>Home</span>
    </button>
  );
}
```


        ## Runtime API

        - Attributes/properties: `accent`, `light`, `background`, `bar`, `foreground`, `muted`, `shadow`, `label`, `result-label`, `secondary-label`, `tertiary-label`, `duration`, `autoplay`, `loop`, `paused`, `presentation`.
        - Methods: `play()`, `pause()`, `restart()`, `seek(milliseconds)`, `setProgress(0..1)`.
        - Events: `motion-ready`, `motion-play`, `motion-pause`, `motion-seek`, `motion-loop`, `motion-complete`.
        - Set `autoplay="false"` or `loop="false"` when the boolean should be false.

        The component respects `prefers-reduced-motion` by holding on the resting flat icon. Add `reduced-motion="allow"` only if the product has a user-controlled motion preference that explicitly permits animation.

        `presentation="inline"` is the default and keeps the camera at 1× inside the existing button. Use `presentation="cinematic"` only when the product explicitly wants the original 10.4× camera push and supplies a coordinated navigation backing surface.
        Inline `restart()` begins at the first visible construction beat, so the existing control responds immediately instead of waiting through a cinematic camera intro. Cinematic `restart()` keeps the complete timeline.

        ## Production notes

        - The component is self-contained; it does not load Figma, Lottie, fonts, images, or third-party scripts.
        - Mount the Home motion inside the existing icon slot while preserving the real button element, action, focus behavior, label, and accessible name.
        - The ES module is safe to import during server rendering and registers the custom element only in a browser.
        - Keep the generated module under source control so the exact approved animation ships with the application.
        - For editorial/video surfaces, prefer the sibling MP4 or WebM export instead of running the component.
