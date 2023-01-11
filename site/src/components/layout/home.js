import styled from "styled-components";
import LayoutOrigin from ".";

const Layout = styled(LayoutOrigin)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    margin-top: 40px;
  }
`;

export default function HomeLayout(props) {
  return <Layout {...props} />;
}
