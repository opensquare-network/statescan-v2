import styled from "styled-components";
import { useMultisigData } from "../../hooks/multisig/useMultisigData";
import AddressOrIdentity from "../address";
import { ReactComponent as IconStatusApproval } from "../icons/status-approval.svg";
import { ReactComponent as IconStatusUnsign } from "../icons/status-unsign.svg";
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

export default function MultisigApprovalList() {
  const { data: { multisig } = {} } = useMultisigData();

  const list = multisig?.signatories
    ?.map((address) => {
      return {
        approval: multisig?.approvals?.includes(address),
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
            {item.approval ? <IconStatusApproval /> : <IconStatusUnsign />}
          </Flex>
          <AddressOrIdentity ellipsis={false} address={item.address} />
        </Item>
      ))}
    </Wrapper>
  );
}
