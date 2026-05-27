import styled from "styled-components";
import BreadCrumb from "../../components/breadCrumb";
import Layout from "../../components/layout";
import EvmExternalLink from "../../components/lido/evmExternalLink";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import Table from "../../components/table";
import { useLidoLocatorData } from "../../hooks/lido/useLidoLocatorData";
import { Inter_14_500, Overpass_Mono_14_500 } from "../../styles/text";
import { getEtherscanAddressUrl } from "../../utils/viewFuncs/lido";

const lidoLocatorHead = [
  { name: "Name", width: 260 },
  { name: "Address", width: 620 },
  {
    name: "Data",
    type: "data",
    align: "right",
    display: "table",
  },
];

const Name = styled.span`
  ${Inter_14_500};
  color: ${(p) => p.theme.fontPrimary};
  white-space: nowrap;
`;

const AddressCount = styled.span`
  ${Inter_14_500};
  color: ${(p) => p.theme.fontSecondary};
  white-space: nowrap;
`;

const AddressLink = styled(EvmExternalLink)`
  ${Overpass_Mono_14_500};
  white-space: nowrap;
`;

function LocatorAddress({ address }) {
  if (!address) {
    return null;
  }

  return (
    <AddressLink
      href={getEtherscanAddressUrl(address)}
      copyContent={address}
      tooltip={false}
    >
      {address}
    </AddressLink>
  );
}

function toAddressData(addresses = []) {
  return Object.fromEntries(
    addresses.map((component) => [
      component.name,
      <LocatorAddress address={component.address} />,
    ]),
  );
}

function toLidoLocatorTableData(items = []) {
  return items.map((item) => {
    if (Array.isArray(item.address)) {
      return [
        <Name key={`${item.functionName}-name`}>{item.name}</Name>,
        <AddressCount key={`${item.functionName}-count`}>
          {item.address.length} addresses
        </AddressCount>,
        toAddressData(item.address),
      ];
    }

    return [
      <Name key={`${item.functionName}-name`}>{item.name}</Name>,
      <LocatorAddress address={item.address} />,
    ];
  });
}

export default function LidoLocator() {
  const { data, loading } = useLidoLocatorData();

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Locator" }]} />

      <StyledPanelTableWrapper>
        <Table
          heads={lidoLocatorHead}
          data={toLidoLocatorTableData(data)}
          loading={loading}
        />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
