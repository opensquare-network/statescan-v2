/**
 * @param {import("styled-components").ThemedCssFunction} css
 * @description less than 992
 */
export const mdcss = (css) => makeBreakpoint(css, 992);

function makeBreakpoint(css, breakpoint) {
  return `@media (max-width: ${breakpoint}px) {
    ${css}
  }`;
}
