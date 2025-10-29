import { StyledPanelTableWrapper } from "../../../components/styled/panel";
import BreadCrumb from "../../../components/breadCrumb";
import Layout from "../../../components/layout";

export default function StakingValidators() {
  return (
    <Layout>
      <BreadCrumb data={[{ name: "Validators" }]} />
      <StyledPanelTableWrapper>validators page</StyledPanelTableWrapper>
    </Layout>
  );
}
