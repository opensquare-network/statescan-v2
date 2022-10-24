// https://getbootstrap.com/docs/5.2/layout/breakpoints/
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
export const mdcss = (css) => makeBreakpoint(css, 992);

/**
 * @param {import("styled-components").ThemedCssFunction} css
 * @description less than 1200
 */
export const lgcss = (css) => makeBreakpoint(css, 1200);

function makeBreakpoint(css, breakpoint) {
  return `@media (max-width: ${breakpoint}px) {
    ${css}
  }`;
}
