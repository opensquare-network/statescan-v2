import { Inter_20_700 } from "../../styles/text";
import { chains } from "../../utils/constants";
import styled from "styled-components";
import { Flex } from "../styled/flex";
import Link from "../styled/link";

const Wrapper = styled(Flex)`
  margin-bottom: 16px;
  height: 36px;
`;

const BreadCrumbWrapper = styled(Flex)`
  font-size: 20px;
  line-height: 20px;
  font-weight: bold;
  ${Inter_20_700};

  > :not(:first-child) {
    margin-left: 8px;
  }

  > :last-child {
    color: ${(p) => p.theme.theme500};
  }
`;

const StyledLink = styled.div`
  cursor: pointer;
  text-decoration: none;
  color: ${(p) => p.theme.fontPrimary};

  :hover {
    color: ${(p) => p.theme.theme500};
  }

  ::after {
    content: "/";
    margin-left: 8px;
    color: ${(p) => p.theme.fontTertiary};
  }
`;

export default function BreadCrumb({ data }) {
  const chain = process.env.REACT_APP_PUBLIC_CHAIN;
  if (!chain) {
    throw new Error("CHAIN is not defined");
  }
  const chainName = chains.find((item) => item.value === chain)?.name;

  return (
    <Wrapper>
      <BreadCrumbWrapper chain={chain}>
        <Link to={`/`}>
          <StyledLink chain={chain}>{chainName}</StyledLink>
        </Link>
        {(data || []).map((item, index) =>
          item.path ? (
            <Link to={item.path} key={index}>
              <StyledLink chain={chain}>{item.name}</StyledLink>
            </Link>
          ) : (
            <span key={index}>{item.name}</span>
          ),
        )}
      </BreadCrumbWrapper>
    </Wrapper>
  );
}
