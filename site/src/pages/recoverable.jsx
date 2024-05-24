import { useParams } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb";
import DetailLayout from "../components/layout/detailLayout";
import { addressEllipsis } from "@osn/common";

export default function RecoverablePage() {
  const { id } = useParams();
  const [address, height] = id.split("-");

  return (
    <DetailLayout
      breadCrumb={
        <BreadCrumb
          data={[
            { name: "Recoverables", path: "/recoverables" },
            {
              name: `${addressEllipsis(address)}-${Number(
                height,
              ).toLocaleString()}`,
            },
          ]}
        />
      }
    ></DetailLayout>
  );
}
