// https://tailwindcss.com/docs/responsive-design
// but use `max-width`

/**
 * @param {import("styled-components").ThemedCssFunction} css
 * @alias mobilecss
 * @description less than 768
 */
export const smcss = (css) => makeBreakpoint(css, 768);

/**
 * @param {import("styled-components").ThemedCssFunction} css
 * @description less than 992
 */
export const mdcss = (css) => makeBreakpoint(css, 1024);

/**
 * @param {import("styled-components").ThemedCssFunction} css
 * @description less than 1200
 */
export const lgcss = (css) => makeBreakpoint(css, 1280);

function makeBreakpoint(css, breakpoint) {
  return `@media (max-width: ${breakpoint}px) {
    ${css}
  }`;
}
