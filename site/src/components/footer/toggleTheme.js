import { ReactComponent as SunIcon } from "./sun.svg";
import { ReactComponent as MoonIcon } from "./moon.svg";
import { useDispatch, useSelector } from "react-redux";
import { modeSelector, setMode } from "../../store/reducers/modeSlice";
import styled from "styled-components";
import { Flex } from "../styled/flex";

const Wrapper = styled(Flex)`
  gap: 24px;

  svg {
    cursor: pointer;
  }
`;
const Divider = styled.div`
  width: 1px;
  height: 12px;
  background: ${(props) => props.theme.strokeBox};
`;

export default function ToggleTheme() {
  const dispatch = useDispatch();
  const mode = useSelector(modeSelector);

  return (
    <Wrapper
      onClick={() => {
        dispatch(setMode(mode === "light" ? "dark" : "light"));
      }}
    >
      <Divider />
      {mode === "light" ? <MoonIcon /> : <SunIcon />}
    </Wrapper>
  );
}
