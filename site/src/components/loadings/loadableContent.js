import styled from "styled-components";
import LoadingInlineAnimationIcon from "../icons/loadingInlineAnimationIcon";

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  width: 14px;
  height: 18px;
  vertical-align: -2px;

  > svg {
    display: block;
    width: 14px;
    height: 14px;
  }
`;

function LoadingIconWrapper() {
  return (
    <Wrapper>
      <LoadingInlineAnimationIcon />
    </Wrapper>
  );
}

export default function LoadableContent({ loading, children }) {
  if (loading) {
    return <LoadingIconWrapper />;
  }

  return children;
}
