// https://tailwindcss.com/docs/responsive-design
// but use `max-width`

export const SM_SIZE = 768;
export const MD_SIZE = 1024;
export const LG_SIZE = 1280;

/**
 * @param {import("styled-components").ThemedCssFunction} css
 * @alias mobilecss
 * @description less than 768
 */
export const smcss = (css) => makeBreakpoint(css, SM_SIZE);

/**
 * @param {import("styled-components").ThemedCssFunction} css
 * @description less than 992
 */
export const mdcss = (css) => makeBreakpoint(css, MD_SIZE);

/**
 * @param {import("styled-components").ThemedCssFunction} css
 * @description less than 1200
 */
export const lgcss = (css) => makeBreakpoint(css, LG_SIZE);

function makeBreakpoint(css, breakpoint) {
  return `@media (max-width: ${breakpoint}px) {
    ${css}
  }`;
}
