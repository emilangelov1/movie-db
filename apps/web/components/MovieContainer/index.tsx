import { styled } from "goober";

const FlexContainer = styled("div")`
  display: flex;
  justify-content: center;
  gap: 5px;
  border: 1px solid red;
`;

type P = {
  children: React.ReactNode;
};

export const MoviesContainer = ({ children }: P) => {
  return <FlexContainer>{children}</FlexContainer>;
};
