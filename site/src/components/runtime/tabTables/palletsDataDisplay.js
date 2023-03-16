import DataDisplay from "../../dataDisplay";

export default function RuntimePalletsDataDisplay({ pallet }) {
  return <DataDisplay tableData={pallet} JSONData={pallet} />;
}
