import styled from "styled-components";
import { Inter_12_600 } from "../../../styles/text";

const Th = styled.th`
  box-sizing: border-box;
  padding: 16px 24px;
  ${Inter_12_600};
  color: ${(p) => p.theme.fontTertiary};
  text-transform: uppercase;
`;

export default function TableHead({ heads }) {
  return heads.map(({ name, align, width }, index) => {
    const style = {
      textAlign: align ?? "left",
      width: width ?? "100%",
    };
    return (
      <Th style={style} key={index}>
        {name}
      </Th>
    );
  });
}
