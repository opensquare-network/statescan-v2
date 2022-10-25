import NotFoundError from "../components/errors/notFoundError";
import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import React from "react";

function NotFound() {
  return (
    <Layout>
      <BreadCrumb data={[{ name: "Error" }]} />
      <NotFoundError />
    </Layout>
  );
}

export default NotFound;
