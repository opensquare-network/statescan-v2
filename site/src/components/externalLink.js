import styled from "styled-components";

const Wrapper = styled.a`
  cursor: pointer;
`;

export default function ExternalLink({ children, href, className, ...props }) {
  return (
    <Wrapper
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </Wrapper>
  );
}
