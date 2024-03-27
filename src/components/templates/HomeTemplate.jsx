import styled from "styled-components";
export function HomeTemplate() {
  return (
    <Containter>
      <h1>Home Template</h1>
    </Containter>
  );
}
const Containter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  backgroud-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;
