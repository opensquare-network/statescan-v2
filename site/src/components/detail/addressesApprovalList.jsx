import styled from "styled-components";
import AddressOrIdentity from "../address";
import { Flex } from "../styled/flex";

const Wrapper = styled.ul`
  list-style: none;
  padding: 16px 24px;
  margin: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 0;
`;

export default function AddressesApprovalList({
  addresses = [],
  approvals = [],
}) {
  const list = addresses
    ?.map((address) => {
      return {
        approval: approvals?.includes(address),
        address,
      };
    })
    .sort((a, b) => {
      if (a.approval === b.approval) {
        return 0;
      }
      if (a.approval) {
        return -1;
      }
      return 1;
    });

  return (
    <Wrapper>
      {list?.map((item) => (
        <Item key={item.address}>
          <Flex>
            {item.approval ? (
              <img src="/imgs/icons/status-approval.svg" alt="approved" />
            ) : (
              <img src="/imgs/icons/status-unsign.svg" alt="un-sign" />
            )}
          </Flex>
          <AddressOrIdentity ellipsis={false} address={item.address} />
        </Item>
      ))}
    </Wrapper>
  );
}
