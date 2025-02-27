import styled from "styled-components";
import { ReactComponent as Question } from "./question.svg";

const QuestionIcon = styled(Question)`
  path {
    fill: ${(p) => p.theme.fontSecondary};
  }
`;

export default QuestionIcon;
