import noop from "lodash.noop";
import styled from "styled-components";
import Dropdown from "../dropdown";
import Input from ".";
import { Flex } from "../styled/flex";

const StyledDropdown = styled(Dropdown)`
  > div:first-child {
    border: 0;
    box-shadow: none;
    height: 100%;
  }
`;

const StyledInput = styled(Input)`
  padding-left: 0;
`;

const InputPrefixWrapper = styled(Flex)`
  column-gap: 12px;
`;

export default function InputWithSelectPrefix({
  inputPrefix,
  mini,
  placeholder = "",
  onSelect = noop,
  options = [],
  selectValue,
  onChange = noop,
}) {
  return (
    <StyledInput
      prefix={
        <InputPrefixWrapper>
          <StyledDropdown
            value={selectValue}
            options={options}
            width={"100%"}
            onSelect={onSelect}
          />
          {inputPrefix}
        </InputPrefixWrapper>
      }
      mini={mini}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
