import noop from "lodash.noop";
import styled from "styled-components";
import Dropdown from "../dropdown";
import Input from ".";
import { Flex } from "../styled/flex";

const StyledDropdown = styled(Dropdown)`
  > div:first-child {
    background: transparent;
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

/**
 * @param {import("./types").InputProps} props
 */
export default function InputWithSelectPrefix({
  prefix,
  onSelect = noop,
  selectOptions = [],
  selectValue,
  ...props
}) {
  return (
    <StyledInput
      {...props}
      prefix={
        <InputPrefixWrapper>
          <StyledDropdown
            value={selectValue}
            options={selectOptions}
            width={"100%"}
            onSelect={onSelect}
          />
          {prefix}
        </InputPrefixWrapper>
      }
    />
  );
}
