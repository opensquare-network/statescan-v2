import styled from "styled-components";
import { ReactComponent as KusamaParaIdSquare } from "./kusama-para-id-square.svg";

const KusamaParaIdSquareIcon = styled(KusamaParaIdSquare)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
  }

  linearGradient {
    stop:first-child {
      stop-color: ${({ theme }) => theme.fontPrimary};
    }

    stop:last-child {
      stop-color: ${({ theme }) => theme.fontPrimary};
    }
  }
`;

export default KusamaParaIdSquareIcon;
