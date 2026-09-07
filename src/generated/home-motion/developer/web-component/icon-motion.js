const DEFAULTS = Object.freeze({"mode": "house", "recipe": null, "scope": "icon", "durationMs": 5000, "inlineStart": 0.2, "label": "首页", "resultLabel": null, "secondaryLabel": "History", "tertiaryLabel": "Check", "colors": {"accent": "#D0ED90", "light": "#F3FF0B", "background": "#F0EEE8", "bar": "#090909", "foreground": "#E4E1D9", "muted": "#706D66", "shadow": "rgba(38,34,27,.42)"}});
const MOTION_CSS = ":host {\n      --stage-size: 1080px;\n      --duration: 5000ms;\n      --motion-delay: 0ms;\n      --motion-state: running;\n      --motion-iterations: infinite;\n      --background: #F0EEE8;\n      --bar: #090909;\n      --foreground: #E4E1D9;\n      --muted: #706D66;\n      --accent: #D0ED90;\n      --light: #F3FF0B;\n      --shadow: rgba(38,34,27,.42);\n      --ease: cubic-bezier(.18,.72,.22,1);\n      --ease-soft: cubic-bezier(.25,.1,.25,1);\n      --ease-off: cubic-bezier(.4,0,.65,.35);\n      --ease-fold: cubic-bezier(.4,0,.2,1);\n      --ease-crossfade: cubic-bezier(.33,0,.2,1);\n    }\n\n    * { box-sizing: border-box; }\n\n    html, body {\n      width: 100%;\n      min-height: 100%;\n      margin: 0;\n      background: #181818;\n    }\n\n    body {\n      display: grid;\n      place-items: center;\n      overflow: auto;\n      font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;\n    }\n\n    .stage {\n      position: relative;\n      width: var(--stage-size);\n      height: var(--stage-size);\n      overflow: hidden;\n      background:\n        radial-gradient(circle at 48% 44%, rgba(255,255,255,.72), transparent 45%),\n        var(--background);\n      isolation: isolate;\n    }\n\n    .ambient {\n      position: absolute;\n      inset: 0;\n      background: linear-gradient(135deg, rgba(255,255,255,.20), transparent 42%);\n      pointer-events: none;\n    }\n\n    .anim {\n      animation-duration: var(--duration);\n      animation-iteration-count: var(--motion-iterations);\n      animation-fill-mode: both;\n      animation-delay: var(--motion-delay);\n      animation-play-state: var(--motion-state);\n    }\n\n    .nav-camera {\n      position: absolute;\n      left: 30%;\n      top: 33%;\n      width: 100%;\n      height: 34%;\n      animation-name: camera;\n      transform-origin: 21.5% 50%;\n      will-change: transform;\n    }\n\n    .nav {\n      position: absolute;\n      inset: 0;\n      display: grid;\n      grid-template-columns: repeat(3, calc(var(--stage-size) * .237));\n      justify-content: start;\n      align-items: center;\n      padding: 2.4% 2.5% 2.4% calc(var(--stage-size) * .096);\n      border-radius: calc(var(--stage-size) * .102);\n      background: var(--bar);\n      box-shadow:\n        0 calc(var(--stage-size) * .038) calc(var(--stage-size) * .065) var(--shadow),\n        inset 0 1px 0 rgba(255,255,255,.04);\n    }\n\n    .nav-item {\n      min-width: 0;\n      height: 82%;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      gap: calc(var(--stage-size) * .008);\n      color: var(--muted);\n    }\n\n    .nav-item.inactive {\n      animation-name: defocus;\n      will-change: filter, opacity;\n    }\n\n    .nav-item.inactive .icon-shell {\n      width: calc(var(--stage-size) * .112);\n      height: calc(var(--stage-size) * .112);\n    }\n\n    .icon-shell {\n      position: relative;\n      width: calc(var(--stage-size) * .128);\n      height: calc(var(--stage-size) * .128);\n      display: grid;\n      place-items: center;\n    }\n\n    .icon-shell > svg {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      overflow: visible;\n    }\n\n    .mode-house .nav-item.active .icon-shell > svg {\n      width: 210%;\n      height: 210%;\n    }\n\n\n    .label {\n      color: currentColor;\n      font-size: calc(var(--stage-size) * .0365);\n      font-weight: 440;\n      line-height: 1;\n      letter-spacing: -.02em;\n      white-space: nowrap;\n    }\n\n    .nav-item.active .label {\n      animation-name: active-label;\n      color: #858179;\n    }\n\n    .icon-shell > svg.history-icon {\n      width: 100%;\n      height: 100%;\n      color: var(--muted);\n    }\n\n    .icon-shell > svg.check-icon {\n      width: 70%;\n      height: 70%;\n      color: var(--accent);\n    }\n\n    @keyframes camera {\n      0%, 9% { transform: translate3d(0,0,0) scale(1); }\n      9% { animation-timing-function: var(--ease); }\n      24%, 76% { transform: translate3d(0,0,0) scale(1.8); }\n      76% { animation-timing-function: var(--ease); }\n      90%, 100% { transform: translate3d(0,0,0) scale(1); }\n    }\n\n    @keyframes defocus {\n      0%, 10%, 89%, 100% { filter: blur(0); opacity: 1; }\n      10% { animation-timing-function: var(--ease-soft); }\n      24%, 76% { filter: blur(calc(var(--stage-size) * .0038)); opacity: .58; }\n      76% { animation-timing-function: var(--ease-soft); }\n    }\n\n    @keyframes active-label {\n      0%, 20%, 82%, 100% { color: #77736c; }\n      20% { animation-timing-function: var(--ease-soft); }\n      38%, 62% { color: #a09c93; }\n      62% { animation-timing-function: var(--ease-soft); }\n    }\n\n    /* House template */\n    .flat-house {\n      fill: #706c64;\n      transform-box: fill-box;\n      transform-origin: center;\n      animation-name: flat-house;\n    }\n\n    .house-assembly,\n    .house-lighting {\n      transform: translate(-15px,0);\n      transform-box: fill-box;\n    }\n\n    .house-front {\n      fill: #c9c6bf;\n      animation-name: house-front;\n      transform-box: fill-box;\n      transform-origin: center bottom;\n    }\n\n    .house-side {\n      fill: #211f1d;\n      animation-name: house-side;\n      transform-box: fill-box;\n      transform-origin: right center;\n      will-change: transform;\n    }\n\n    .house-roof {\n      fill: #efede8;\n      animation-name: house-roof;\n      transform-box: fill-box;\n      will-change: clip-path;\n    }\n\n    .roof-line {\n      fill: none;\n      stroke: #faf9f5;\n      stroke-width: 3;\n      stroke-linecap: round;\n      stroke-dasharray: 54;\n      animation-name: roof-line;\n      will-change: stroke-dashoffset, opacity;\n    }\n\n    .door {\n      fill: var(--bar);\n      animation-name: doorway;\n      transform-box: fill-box;\n      transform-origin: center bottom;\n      will-change: transform;\n    }\n\n    .porthole {\n      fill: var(--bar);\n      animation-name: porthole;\n      transform-box: fill-box;\n      transform-origin: center;\n      will-change: transform;\n    }\n\n    .porthole-light {\n      fill: var(--light);\n      animation-name: porthole-light;\n      transform-box: fill-box;\n      transform-origin: center;\n      will-change: transform, opacity;\n    }\n\n    .side-window {\n      fill: #0e0e0d;\n      animation-name: side-window;\n      transform-box: fill-box;\n      transform-origin: right center;\n      will-change: transform;\n    }\n\n    .light-beam {\n      fill: url(#beamGradient);\n      animation-name: light-beam;\n      transform-box: fill-box;\n      transform-origin: right center;\n      mix-blend-mode: normal;\n      will-change: transform, opacity;\n    }\n\n    .light-underfold {\n      fill: url(#beamGradient);\n      animation-name: light-underfold;\n      transform-box: fill-box;\n      transform-origin: right center;\n      mix-blend-mode: screen;\n      will-change: transform, opacity;\n    }\n\n    .beam-hot {\n      stop-color: color-mix(in srgb, var(--light), #8a290b 55%);\n    }\n\n    .beam-mid {\n      stop-color: color-mix(in srgb, var(--light), #541700 70%);\n    }\n\n    .beam-tail {\n      stop-color: color-mix(in srgb, var(--light), #271100 82%);\n    }\n\n\n    .light-cube {\n      animation-name: light-cube;\n      transform-box: fill-box;\n      transform-origin: right center;\n      will-change: transform;\n    }\n\n    .light-cube-side {\n      fill: var(--light);\n    }\n\n    @keyframes flat-house {\n      0%, 20% {\n        opacity: 1;\n        fill: #706c64;\n        transform: translate(0,0) scale(1);\n      }\n      20% { animation-timing-function: var(--ease); }\n      25.5% {\n        opacity: 1;\n        fill: #aaa79f;\n        transform: translate(11px,2px) scale(1.05);\n      }\n      26.5% {\n        opacity: 1;\n        fill: #c9c6bf;\n        transform: translate(11px,2px) scale(1.05);\n        animation-timing-function: var(--ease-crossfade);\n      }\n      29.5%, 72.5% {\n        opacity: 0;\n        fill: #c9c6bf;\n        transform: translate(11px,2px) scale(1.05);\n      }\n      72.5% {\n        animation-timing-function: var(--ease-crossfade);\n      }\n      75.5% {\n        opacity: 1;\n        fill: #c9c6bf;\n        transform: translate(11px,2px) scale(1.05);\n        animation-timing-function: var(--ease);\n      }\n      83.5%, 100% {\n        opacity: 1;\n        fill: #706c64;\n        transform: translate(0,0) scale(1);\n      }\n    }\n\n    @keyframes house-front {\n      0%, 26.5% { opacity: 0; }\n      26.5% { animation-timing-function: var(--ease-crossfade); }\n      29.5%, 72.5% { opacity: 1; }\n      72.5% { animation-timing-function: var(--ease-crossfade); }\n      75.5%, 100% { opacity: 0; }\n    }\n\n    @keyframes house-side {\n      0%, 24.5% { opacity: 1; transform: scaleX(0); }\n      24.5% { animation-timing-function: var(--ease); }\n      31.5%, 68.5% { opacity: 1; transform: scaleX(1); }\n      68.5% { animation-timing-function: var(--ease-fold); }\n      75.5%, 100% { opacity: 1; transform: scaleX(0); }\n    }\n\n    @keyframes house-roof {\n      0%, 23.5% {\n        opacity: 1;\n        clip-path: polygon(50% 100%,100% 46%,100% 46%,50% 100%);\n      }\n      23.5% {\n        animation-timing-function: var(--ease);\n      }\n      30.5%, 69% {\n        opacity: 1;\n        clip-path: polygon(0 54%,49% 0,100% 46%,50% 100%);\n      }\n      69% { animation-timing-function: var(--ease-fold); }\n      76%, 100% {\n        opacity: 1;\n        clip-path: polygon(50% 100%,100% 46%,100% 46%,50% 100%);\n      }\n    }\n\n    @keyframes roof-line {\n      0%, 21.5% { opacity: 0; stroke-dashoffset: 54; }\n      21.5% { animation-timing-function: var(--ease); }\n      24.5%, 26% { opacity: 1; stroke-dashoffset: 0; }\n      28.5%, 71.5% { opacity: 0; stroke-dashoffset: 0; }\n      71.5% { animation-timing-function: var(--ease); }\n      73.5%, 74.5% { opacity: 1; stroke-dashoffset: 0; }\n      77.5%, 100% { opacity: 0; stroke-dashoffset: 54; }\n    }\n\n    @keyframes doorway {\n      0%, 25.5% { transform: scaleY(0); opacity: 1; }\n      25.5% { animation-timing-function: var(--ease); }\n      32%, 67.5% { transform: scaleY(1); opacity: 1; }\n      67.5% { animation-timing-function: var(--ease-fold); }\n      74.5%, 100% { transform: scaleY(0); opacity: 1; }\n    }\n\n    @keyframes porthole {\n      0%, 25% { transform: scale(0); opacity: 1; }\n      25% { animation-timing-function: var(--ease); }\n      31.5%, 66.5% { transform: scale(1); opacity: 1; }\n      66.5% { animation-timing-function: var(--ease-fold); }\n      73.5%, 100% { transform: scale(0); opacity: 1; }\n    }\n\n    @keyframes porthole-light {\n      0%, 31% { transform: translateX(-5px) scale(.1); opacity: 0; }\n      31% { animation-timing-function: var(--ease-soft); }\n      36.5%, 61.5% { transform: translateX(0) scale(1); opacity: 1; }\n      61.5% { animation-timing-function: var(--ease-off); }\n      66.5%, 100% { transform: translateX(-5px) scale(.1); opacity: 0; }\n    }\n\n    @keyframes side-window {\n      0%, 29.5% { opacity: 1; transform: scaleX(0); }\n      29.5% { animation-timing-function: var(--ease-soft); }\n      34%, 63.5% { opacity: 1; transform: scaleX(1); }\n      63.5% { animation-timing-function: var(--ease-off); }\n      69%, 100% { opacity: 1; transform: scaleX(0); }\n    }\n\n    @keyframes light-beam {\n      0%, 34% { opacity: 0; transform: scaleX(0); }\n      34% { animation-timing-function: var(--ease-soft); }\n      40%, 60.5% { opacity: .82; transform: scaleX(1); }\n      60.5% { animation-timing-function: var(--ease-off); }\n      65%, 100% { opacity: 0; transform: scaleX(0); }\n    }\n\n    @keyframes light-underfold {\n      0%, 34.5% { opacity: 0; transform: scaleX(0); }\n      34.5% { animation-timing-function: var(--ease-soft); }\n      40.5%, 59.5% { opacity: .28; transform: scaleX(1); }\n      59.5% { animation-timing-function: var(--ease-off); }\n      64.5%, 100% { opacity: 0; transform: scaleX(0); }\n    }\n\n    @keyframes light-cube {\n      0%, 33.5% { opacity: 1; transform: scaleX(0); }\n      33.5% { animation-timing-function: var(--ease-soft); }\n      38%, 60.5% { opacity: 1; transform: scaleX(1); }\n      60.5% { animation-timing-function: var(--ease-off); }\n      66%, 100% { opacity: 1; transform: scaleX(0); }\n    }\n\n\n    @media (prefers-reduced-motion: reduce) {\n      :host(:not([reduced-motion=\"allow\"])) .anim { animation-play-state: paused; animation-delay: 0ms; }\n    }";
const MOTION_MARKUP = "<main class=\"stage mode-house\" aria-label=\"Home Icon Motion\">\n    <div class=\"ambient\"></div>\n    <div class=\"nav-camera anim\">\n      <section class=\"nav\">\n        <div class=\"nav-item active\">\n          <div class=\"icon-shell\"><svg class=\"house-motion\" viewBox=\"-35 -10 250 175\" aria-hidden=\"true\">\n  <defs>\n    <linearGradient id=\"beamGradient\" x1=\"1\" y1=\".5\" x2=\"0\" y2=\".5\">\n      <stop class=\"beam-hot\" offset=\"0\" stop-opacity=\".98\"/>\n      <stop class=\"beam-mid\" offset=\".42\" stop-opacity=\".62\"/>\n      <stop class=\"beam-tail\" offset=\"1\" stop-opacity=\"0\"/>\n    </linearGradient>\n    <filter id=\"beamBlur\" x=\"-30%\" y=\"-30%\" width=\"160%\" height=\"160%\">\n      <feGaussianBlur stdDeviation=\".35\"/>\n    </filter>\n  </defs>\n  <path class=\"flat-house anim\" d=\"M50 74 90 39 130 74v58H50Z\"/>\n  <g class=\"house-assembly anim\">\n    <path class=\"house-side anim\" d=\"M32 44 74 72v64l-42-25Z\"/>\n    <path class=\"house-front anim\" d=\"M74 72 116 39 158 72v64H74Z\"/>\n    <path class=\"house-roof anim\" d=\"M32 44 73 11l43 28-42 33Z\"/>\n    <path class=\"roof-line anim\" d=\"M74 72 116 39\"/>\n    <rect class=\"door anim\" x=\"94\" y=\"98\" width=\"46\" height=\"39\"/>\n    <path class=\"side-window anim\" d=\"m46 71 14 9v23l-14-9Z\"/>\n    <circle class=\"porthole anim\" cx=\"120\" cy=\"74\" r=\"10.5\"/>\n    <g class=\"porthole-light-tilt\" transform=\"rotate(22 116.4 72.6)\">\n      <ellipse\n        class=\"porthole-light anim\"\n        cx=\"116.4\"\n        cy=\"72.6\"\n        rx=\"6.8\"\n        ry=\"8.6\"\n      />\n    </g>\n  </g>\n  <g class=\"house-lighting anim\">\n    <path class=\"light-beam anim\" filter=\"url(#beamBlur)\" d=\"M46 71-15 83-15 149 46 112 60 103 46 94Z\"/>\n    <path class=\"light-underfold anim\" d=\"M46 94 60 103 46 112-15 149Z\"/>\n    <g class=\"light-cube anim\">\n      <path class=\"light-cube-side\" d=\"m46 71 14 9v23l-14-9Z\"/>\n    </g>\n  </g>\n</svg></div>\n          <div class=\"label\" data-motion-label=\"active\">首页</div>\n        </div>\n        <div class=\"nav-item inactive anim\">\n          <div class=\"icon-shell\">\n            <svg class=\"history-icon\" viewBox=\"0 0 100 100\" aria-hidden=\"true\">\n              <path fill=\"currentColor\" d=\"M24 28h52l-5 52c-.5 5-4 8-9 8H38c-5 0-8.5-3-9-8Z\"/>\n              <ellipse cx=\"50\" cy=\"28\" rx=\"26\" ry=\"10\" fill=\"currentColor\"/>\n              <ellipse cx=\"50\" cy=\"29\" rx=\"18\" ry=\"4.5\" fill=\"var(--bar)\"/>\n            </svg>\n          </div>\n          <div class=\"label\" data-motion-label=\"secondary\">History</div>\n        </div>\n        <div class=\"nav-item inactive anim\">\n          <div class=\"icon-shell\">\n            <svg class=\"check-icon\" viewBox=\"0 0 100 100\" aria-hidden=\"true\">\n              <circle cx=\"50\" cy=\"50\" r=\"39\" fill=\"currentColor\"/>\n              <path d=\"M50 29v42M29 50h42\" fill=\"none\" stroke=\"#0c0c0b\" stroke-width=\"9\" stroke-linecap=\"round\"/>\n            </svg>\n          </div>\n          <div class=\"label\" data-motion-label=\"tertiary\">Check</div>\n        </div>\n      </section>\n    </div>\n  </main>";
const HTMLElementBase = globalThis.HTMLElement ?? class {};
const INLINE_RESTART_PROGRESS = 0.2;

const COLOR_PROPERTIES = Object.freeze({
  accent: "--accent",
  background: "--background",
  bar: "--bar",
  foreground: "--foreground",
  light: "--light",
  muted: "--muted",
  shadow: "--shadow",
});

function readBooleanAttribute(element, name, fallback) {
  if (!element.hasAttribute(name)) return fallback;
  return element.getAttribute(name) !== "false";
}

function readBooleanProperty(value) {
  return value !== false && value !== "false" && value != null;
}

function asFiniteNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export class IconMotionElement extends HTMLElementBase {
  static get observedAttributes() {
    return [
      ...Object.keys(COLOR_PROPERTIES),
      "autoplay",
      "duration",
      "label",
      "loop",
      "paused",
      "result-label",
      "secondary-label",
      "tertiary-label",
    ];
  }

  constructor() {
    super();
    this._connected = false;
    this._boundIteration = (event) => {
      if (event.target !== this._camera) return;
      this._emit("motion-loop", { progress: 0 });
    };
    this._boundComplete = (event) => {
      if (event.target !== this._camera) return;
      if (!this.loop) {
        this._setPlaybackState("paused");
        this._emit("motion-complete", { progress: 1 });
      }
    };

    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        ${MOTION_CSS}

        :host {
          display: inline-block;
          position: relative;
          width: 24px;
          height: 24px;
          max-width: none;
          overflow: visible;
          vertical-align: middle;
          contain: layout style;
          --component-scale: 1;
          --icon-focus-x: 0%;
          --icon-focus-y: 0%;
          --icon-focus-scale: 1;
          --motion-state: paused;
          --motion-iterations: 1;
        }

        :host([presentation="cinematic"]) {
          --icon-focus-y: -540%;
          --icon-focus-scale: 10.4;
        }

        .motion-viewport {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          background: transparent;
          pointer-events: none;
        }

        .motion-viewport > .stage {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          background: transparent;
          transform: none;
        }

        .ambient {
          display: none;
        }

        .nav-camera {
          inset: 0;
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          transform-origin: 50% 58%;
          animation-name: icon-camera;
        }

        .nav {
          position: absolute;
          inset: 0;
          display: block;
          padding: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
        }

        .nav-item.active {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          color: var(--muted);
        }

        .nav-item.inactive {
          display: none;
        }

        .nav-item.active .icon-shell {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .mode-house .nav-item.active .icon-shell > svg {
          width: 210%;
          height: 210%;
        }


        .label:not([data-motion-label="result"]) {
          display: none;
        }

        .motion-reset .anim {
          animation-name: none !important;
        }

        @keyframes icon-camera {
          0%, 9% {
            transform: translate3d(0,0,0) scale(1);
          }
          9% {
            animation-timing-function: var(--ease);
          }
          24%, 76% {
            transform:
              translate3d(var(--icon-focus-x),var(--icon-focus-y),0)
              scale(var(--icon-focus-scale));
          }
          76% {
            animation-timing-function: var(--ease);
          }
          90%, 100% {
            transform: translate3d(0,0,0) scale(1);
          }
        }

      </style>
      <div class="motion-viewport">${MOTION_MARKUP}</div>
    `;

    this._viewport = root.querySelector(".motion-viewport");
    this._stage = root.querySelector(".stage");
    this._camera = root.querySelector(".nav-camera");
    this._labels = {
      active: [...root.querySelectorAll('[data-motion-label="active"]')],
      result: [...root.querySelectorAll('[data-motion-label="result"]')],
      secondary: [...root.querySelectorAll('[data-motion-label="secondary"]')],
      tertiary: [...root.querySelectorAll('[data-motion-label="tertiary"]')],
    };
  }

  connectedCallback() {
    if (this._connected) return;
    this._connected = true;
    this._syncAll();
    this._camera?.addEventListener("animationiteration", this._boundIteration);
    this._camera?.addEventListener("animationend", this._boundComplete);

    if (this.paused || !this.autoplay) {
      this._setPlaybackState("paused");
    } else {
      this._setPlaybackState("running");
    }

    queueMicrotask(() => {
      this._emit("motion-ready", {
        duration: this.duration,
        mode: DEFAULTS.mode,
      });
    });
  }

  disconnectedCallback() {
    this._connected = false;
    this._camera?.removeEventListener("animationiteration", this._boundIteration);
    this._camera?.removeEventListener("animationend", this._boundComplete);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this._stage) return;
    if (name in COLOR_PROPERTIES) {
      this._syncColor(name);
      return;
    }
    if (name === "duration") {
      if (newValue == null) this.style.removeProperty("--duration");
      else this.style.setProperty("--duration", `${this.duration}ms`);
      return;
    }
    if (name === "loop") {
      if (newValue == null) this.style.removeProperty("--motion-iterations");
      else this.style.setProperty("--motion-iterations", this.loop ? "infinite" : "1");
      return;
    }
    if (
      name === "label" ||
      name === "result-label" ||
      name === "secondary-label" ||
      name === "tertiary-label"
    ) {
      this._syncLabels();
      return;
    }
    if (!this._connected) return;
    if (name === "paused") {
      this._setPlaybackState(this.paused ? "paused" : "running");
    } else if (name === "autoplay") {
      this._setPlaybackState(this.autoplay ? "running" : "paused");
    }
  }

  get autoplay() {
    return readBooleanAttribute(this, "autoplay", false);
  }

  set autoplay(value) {
    this.setAttribute("autoplay", readBooleanProperty(value) ? "" : "false");
  }

  get loop() {
    return readBooleanAttribute(this, "loop", false);
  }

  set loop(value) {
    this.setAttribute("loop", readBooleanProperty(value) ? "" : "false");
  }

  get paused() {
    return this.hasAttribute("paused");
  }

  set paused(value) {
    this.toggleAttribute("paused", readBooleanProperty(value));
  }

  get duration() {
    return Math.max(1, asFiniteNumber(this.getAttribute("duration"), DEFAULTS.durationMs));
  }

  set duration(value) {
    this.setAttribute("duration", String(Math.max(1, asFiniteNumber(value, DEFAULTS.durationMs))));
  }

  get presentation() {
    return this.getAttribute("presentation") === "cinematic" ? "cinematic" : "inline";
  }

  set presentation(value) {
    this.setAttribute("presentation", value === "cinematic" ? "cinematic" : "inline");
  }

  play() {
    if (this.paused) this.removeAttribute("paused");
    this._setPlaybackState("running");
    this._emit("motion-play", { progress: this.progress });
  }

  pause() {
    if (!this.paused) this.setAttribute("paused", "");
    this._setPlaybackState("paused");
    this._emit("motion-pause", { progress: this.progress });
  }

  restart() {
    const startTime = this.presentation === "inline"
      ? this.duration * INLINE_RESTART_PROGRESS
      : 0;
    this._restartAt(startTime, "running");
    if (this.paused) this.removeAttribute("paused");
    this._emit("motion-play", { progress: 0 });
  }

  seek(milliseconds) {
    const time = Math.max(0, Math.min(asFiniteNumber(milliseconds, 0), this.duration - 0.001));
    this._restartAt(time, "paused");
    if (!this.paused) this.setAttribute("paused", "");
    this._emit("motion-seek", { milliseconds: time, progress: time / this.duration });
    return time;
  }

  setProgress(value) {
    const progress = Math.max(0, Math.min(asFiniteNumber(value, 0), 1));
    return this.seek(progress * this.duration);
  }

  get progress() {
    const delay = this.style.getPropertyValue("--motion-delay");
    const milliseconds = Math.abs(asFiniteNumber(delay.replace("ms", ""), 0));
    return Math.max(0, Math.min(milliseconds / this.duration, 1));
  }

  _restartAt(milliseconds, state) {
    this._stage.classList.add("motion-reset");
    void this._stage.offsetWidth;
    this.style.setProperty("--motion-delay", `${-milliseconds}ms`);
    this.style.setProperty("--motion-state", state);
    this._stage.classList.remove("motion-reset");
    void this._stage.offsetWidth;
  }

  _setPlaybackState(state) {
    this.style.setProperty("--motion-state", state);
  }

  _syncAll() {
    for (const name of Object.keys(COLOR_PROPERTIES)) this._syncColor(name);
    if (this.hasAttribute("duration")) {
      this.style.setProperty("--duration", `${this.duration}ms`);
    }
    if (this.hasAttribute("loop")) {
      this.style.setProperty("--motion-iterations", this.loop ? "infinite" : "1");
    }
    this._syncLabels();
  }

  _syncColor(name) {
    const value = this.getAttribute(name);
    if (value == null) this.style.removeProperty(COLOR_PROPERTIES[name]);
    else this.style.setProperty(COLOR_PROPERTIES[name], value);
  }

  _syncLabels() {
    const label = this.getAttribute("label") || DEFAULTS.label;
    const result = this.getAttribute("result-label") || DEFAULTS.resultLabel;
    const secondary = this.getAttribute("secondary-label") || DEFAULTS.secondaryLabel;
    const tertiary = this.getAttribute("tertiary-label") || DEFAULTS.tertiaryLabel;
    for (const node of this._labels.active) node.textContent = label;
    if (result) for (const node of this._labels.result) node.textContent = result;
    for (const node of this._labels.secondary) node.textContent = secondary;
    for (const node of this._labels.tertiary) node.textContent = tertiary;
    this._stage.setAttribute(
      "aria-label",
      result ? `${label} to ${result} motion` : `${label} navigation motion`,
    );
  }

  _emit(name, detail) {
    this.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail,
    }));
  }
}

if (globalThis.customElements && !customElements.get("home-icon-motion")) {
  customElements.define("home-icon-motion", IconMotionElement);
}

export default IconMotionElement;
