import { extractCss, styled } from "goober";

const Container = styled("div")`
  width: 100px;
  height: 100px;
  background-color: red;
`;

const styles = extractCss();

type P = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

export const Movies = ({ Poster, Title, Type, Year, imdbID }: P) => {
  return (
    <Container>
      {Title}
      {Year}
    </Container>
  );
};
