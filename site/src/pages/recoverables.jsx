import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";

export default function RecoverablesPage() {
  return (
    <Layout>
      <BreadCrumb data={[{ name: "Recoverables" }]} />
    </Layout>
  );
}
