import React from "react";
import styled, { css } from "styled-components";
import { text_theme } from "../../../styles/tailwindcss";
import { Inter_14_500 } from "../../../styles/text";

const Wrapper = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-radius: 4px;

  tbody {
    ::before,
    ::after {
      display: none !important;
    }
  }
`;

const StyledTr = styled.tr`
  ${(p) =>
    p.nested
      ? css`
          :first-child {
            > td {
              border-width: 0 0 0 1px;

              :first-child {
                border-width: 0;
              }
            }
          }

          :not(:first-child) {
            > td {
              border-width: 1px 0 0 1px;

              :first-child {
                border-width: 1px 0 0 0;
              }
            }
          }
        `
      : css`
          :last-child {
            > td {
              border-width: 1px 0 1px 1px;

              :last-child {
                border-width: 1px 1px 1px 1px;
              }
            }
          }
        `}
`;

const StyledTd = styled.td`
  box-sizing: border-box;
  ${Inter_14_500};
  height: 44px;
  border-style: solid;
  border-width: 1px 0 0 1px;
  border-color: ${(p) => p.theme.strokeBox};
  background: ${({ theme }) => theme.fillPanel};

  :last-child {
    border-width: 1px 1px 0 1px;
  }
`;

const NoParameters = styled.span`
  ${text_theme("fontTertiary")};
  ${Inter_14_500};
`;

export default function InnerTable({ data, nested = false }) {
  if (React.isValidElement(data)) {
    return data;
  }

  const formatValue = (fieldValue) =>
    Array.isArray(fieldValue) ? (
      <StyledTd style={{ padding: 0 }}>
        <InnerTable data={fieldValue} nested />
      </StyledTd>
    ) : typeof fieldValue === "object" ? (
      fieldValue === null ? (
        <StyledTd style={{ minWidth: 320, padding: "2px 24px" }}>null</StyledTd>
      ) : React.isValidElement(fieldValue) ? (
        <StyledTd style={{ minWidth: 320, padding: "2px 24px" }}>
          {fieldValue}
        </StyledTd>
      ) : (
        <StyledTd style={{ padding: 0 }}>
          <InnerTable data={fieldValue} nested />
        </StyledTd>
      )
    ) : (
      <StyledTd style={{ minWidth: 320, padding: "2px 24px" }}>
        <span>{fieldValue.toString()}</span>
      </StyledTd>
    );

  if (Array.isArray(data) && data.length < 2) {
    return (
      data.length > 0 && (
        <StyledTable>
          <tbody>
            {data.map((item, index) => (
              <StyledTr key={index} nested={nested}>
                {formatValue(item)}
              </StyledTr>
            ))}
          </tbody>
        </StyledTable>
      )
    );
  }

  if (typeof data === "object") {
    let entries = [];
    if (data.object_type === "table_pairs" && data.object_data !== undefined) {
      entries = data.object_data;
    } else {
      entries = Object.entries(data);
    }

    const width = Array.isArray(data) ? 40 : 160;

    return entries.length > 0 ? (
      <Wrapper>
        <StyledTable>
          <tbody>
            {entries.map(([fieldName, fieldValue], index) => {
              return (
                <StyledTr key={index} nested={nested}>
                  <StyledTd
                    style={{
                      whiteSpace: "nowrap",
                      width,
                      minWidth: width,
                      padding: "2px 24px",
                    }}
                  >
                    {fieldName}
                  </StyledTd>
                  {formatValue(fieldValue)}
                </StyledTr>
              );
            })}
          </tbody>
        </StyledTable>
      </Wrapper>
    ) : (
      <Wrapper>
        <StyledTable>
          <tbody>
            <StyledTr>
              <StyledTd style={{ padding: "2px 24px" }}>
                <NoParameters>No parameters</NoParameters>
              </StyledTd>
            </StyledTr>
          </tbody>
        </StyledTable>
      </Wrapper>
    );
  }

  return <span>{JSON.stringify(data)}</span>;
}
