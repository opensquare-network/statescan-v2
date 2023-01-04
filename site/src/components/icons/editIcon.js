import styled from "styled-components";
import { ReactComponent as EditSVG } from "./edit.svg";

const Edit = styled(EditSVG)`
  & > path {
    stroke-opacity: 1;
    stroke: ${(p) => p.theme.fontTertiary};
  }
`;

export default function EditIcon() {
  return <Edit />;
}
