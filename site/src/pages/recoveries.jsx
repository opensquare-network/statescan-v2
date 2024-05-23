import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";

export default function RecoveriesPage() {
  return (
    <Layout>
      <BreadCrumb data={[{ name: "Recoveries" }]} />
    </Layout>
  );
}
