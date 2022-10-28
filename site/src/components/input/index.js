import styled, { css } from "styled-components";
import { Inter_14_500 } from "../../styles/text";
import { mobilecss } from "../../styles/responsive";

const InputOrigin = styled.input`
  color: ${(props) => props.theme.fontPrimary};
  background: ${(p) => p.theme.fillPanel};
  border: none;
  outline: none;
  width: 100%;

  &::placeholder {
    color: ${(props) => props.theme.fontTertiary};
  }

  ${Inter_14_500};
`;

const InputWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 10px 16px;
  background: ${(p) => p.theme.fillPanel};
  border: 1px solid ${(p) => p.theme.strokeBox};
  border-radius: 8px;

  &:focus-within,
  &:focus {
    border-color: ${(p) => p.theme.theme500};
    outline: none;
    box-shadow: 0 0 0 2px ${(p) => p.theme.theme100};
  }

  ${(p) =>
    p.small &&
    css`
      padding: 6px 12px;
    `}

  ${mobilecss(css`
    padding: 6px 12px;
  `)}
`;

const PrefixWrapper = styled.span`
  display: inline-flex;
  margin-right: 8px;
`;
const SuffixWrapper = styled.span`
  display: inline-flex;
  margin-left: 8px;
`;

/**
 * @param {import("./types").InputProps} props
 */
export default function Input(props) {
  const { prefix, suffix, className, small } = props ?? {};

  return (
    <InputWrapper className={className} small={small}>
      {prefix && <PrefixWrapper>{prefix}</PrefixWrapper>}
      <InputOrigin {...props} />
      {suffix && <SuffixWrapper>{suffix}</SuffixWrapper>}
    </InputWrapper>
  );
}
