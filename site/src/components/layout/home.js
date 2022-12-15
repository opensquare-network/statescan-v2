import styled from "styled-components";
import LayoutOrigin from ".";

const Layout = styled(LayoutOrigin)`
  main {
    margin-top: 40px;
  }
`;

export default function HomeLayout(props) {
  return <Layout {...props} />;
}
