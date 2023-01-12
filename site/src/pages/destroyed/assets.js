import BreadCrumb from "../../components/breadCrumb";
import Layout from "../../components/layout";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import Table from "../../components/table";

export default function DestroyedAssets() {
  const breadcrumb = <BreadCrumb data={[{ name: "Destroyed Assets" }]} />;

  return (
    <Layout>
      {breadcrumb}
      <StyledPanelTableWrapper>
        <Table />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
