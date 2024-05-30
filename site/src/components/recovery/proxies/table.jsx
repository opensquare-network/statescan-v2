import { recoveryProxiesHead } from "../../../utils/constants";
import AddressOrIdentity from "../../address";
import { Flex } from "../../styled/flex";
import { TextTertiary } from "../../styled/text";
import Table from "../../table";

export default function RecoveryProxiesTable({ data = [], loading }) {
  const tableData = data?.map?.((item) => {
    return [
      <Flex>
        <AddressOrIdentity key={item.lost} address={item.lost} />
      </Flex>,
      item.rescuer ? (
        <Flex>
          <AddressOrIdentity key={item.rescuer} address={item.rescuer} />
        </Flex>
      ) : (
        <TextTertiary>-</TextTertiary>
      ),
    ];
  });

  return (
    <Table heads={recoveryProxiesHead} data={tableData} loading={loading} />
  );
}
