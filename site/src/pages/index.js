import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import Explore from "../components/home/explore";
import Sections from "../components/home/sections/index";
import Overview from "../components/home/overview/index";
import { connect } from "../services/websocket";

function Home() {
  const [, setTime] = useState(Date.now());

  useEffect(() => {
    connect();
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Layout>
      <Explore />
      <Overview />
      <Sections />
    </Layout>
  );
}

export default Home;
