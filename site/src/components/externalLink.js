import styled from "styled-components";

const Wrapper = styled.a`
  cursor: pointer;
`;

export default function ExternalLink({ children, href, className }) {
  return (
    <Wrapper
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Wrapper>
  );
}
