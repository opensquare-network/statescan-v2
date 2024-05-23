import DatePicker from "react-datepicker";
import "../../styles/react-datepicker.css";
import styled from "styled-components";
import { FlexCenter, FlexColumn } from "../styled/flex";
import Input from "../input";
import { forwardRef } from "react";
import noop from "lodash.noop";
import CaretRightIcon from "../icons/caretRightIcon";
import moment from "moment";
import { Inter_14_600 } from "../../styles/text";
import { PanelButton } from "../styled/buttons";
import CaretLeftIcon from "../icons/caretLeftIcon";
import CaretFirstIcon from "../icons/caretFirstIcon";
import CaretLastIcon from "../icons/caretLastIcon";

const Wrapper = styled(FlexColumn)`
  color: var(--fontPrimary);
  row-gap: 8px;
`;

const Header = styled.div`
  color: var(--fontPrimary);
  padding: 8px;
  ${Inter_14_600}
`;

const HeaderNavButton = styled(PanelButton)`
  padding: 6px;
  border-radius: 4px;
`;

const CustomInput = forwardRef(({ onClick, ...restProps }, ref) => {
  return (
    <FlexColumn ref={ref} onClick={onClick} style={{ cursor: "pointer" }}>
      <Input
        mini
        {...restProps}
        suffix={<CaretRightIcon />}
        style={{ cursor: "inherit" }}
      />
    </FlexColumn>
  );
});

export default function FilterDatePicker({
  name,
  value,
  datepickerProps = {},
  onChange = noop,
}) {
  return (
    <Wrapper>
      <div>{name}</div>
      <FlexColumn>
        <DatePicker
          {...datepickerProps}
          selected={parseInt(value)}
          onChange={onChange}
          placeholderText="Date"
          customInput={<CustomInput />}
          dateFormat={"yyyy-MM-dd"}
          formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
          showPopperArrow={false}
          popperModifiers={[
            {
              name: "offset",
              options: {
                offset: [0, -4],
              },
            },
          ]}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            decreaseYear,
            increaseYear,
          }) => (
            <Header>
              <FlexCenter gap={8}>
                <HeaderNavButton onClick={decreaseYear}>
                  <CaretFirstIcon />
                </HeaderNavButton>
                <HeaderNavButton onClick={decreaseMonth}>
                  <CaretLeftIcon />
                </HeaderNavButton>

                <FlexCenter style={{ flexGrow: 1 }}>
                  <b>{moment(date).format("MMMM YYYY")}</b>
                </FlexCenter>

                <HeaderNavButton onClick={increaseMonth}>
                  <CaretRightIcon />
                </HeaderNavButton>
                <HeaderNavButton onClick={increaseYear}>
                  <CaretLastIcon />
                </HeaderNavButton>
              </FlexCenter>
            </Header>
          )}
        />
      </FlexColumn>
    </Wrapper>
  );
}
