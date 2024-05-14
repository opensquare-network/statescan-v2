import React from "react";
import HomeLayout from "../components/layout/home";
import Explore from "../components/home/explore";
import Sections from "../components/home/sections";
import styled from "styled-components";
import Overview from "../components/home/overview";
import { m_t } from "../styles/tailwindcss";

const SectionsWrapper = styled.div`
  ${m_t(16)};
`;

const OverviewWrapper = styled.div`
  margin-top: 40px;
`;

function Home() {
  return (
    <HomeLayout>
      <Explore />

      <OverviewWrapper>
        <Overview />
      </OverviewWrapper>

      <SectionsWrapper>
        <Sections />
      </SectionsWrapper>
    </HomeLayout>
  );
}

export default Home;
