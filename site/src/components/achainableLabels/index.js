import styled from "styled-components";
import Label from "./label";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export default function AchainableLabels({ achainableProfile }) {
  if (!achainableProfile) {
    return null;
  }

  const showLabels = achainableProfile.labels.filter((item) => item.result);

  return (
    <Wrapper>
      {showLabels.map((label) => (
        <Label
          key={label.name}
          name={label.name}
          description={label.description}
        />
      ))}
    </Wrapper>
  );
}
