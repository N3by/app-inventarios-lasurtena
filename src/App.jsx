import styled, { ThemeProvider } from "styled-components";
import { AuthContextProvider, MyRoutes, Light, Dark, Sidebar, MenuHambur} from "./index";
import { createContext, useState } from "react";
import { Device } from "./styles/breackpoints";

export const ThemeContext = createContext(null);

function App() {
  const [themeuse, setTheme] = useState("dark");
  const theme = themeuse === "light" ? "light" : "dark";
  const themeStyle = theme === "light" ? Light : Dark;
  const [sidebarOpen, setSidevarOpen] = useState(false);

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={themeStyle}>
          <AuthContextProvider>
            <Containter className={sidebarOpen ? "active" : ""}>
              <section className="ContentSidebar">
                <Sidebar state={sidebarOpen} setState={()=>setSidevarOpen(!sidebarOpen)}/>
              
              </section>
              <section className="ContentMenuambur"><MenuHambur/>

              
              </section>

              <section className="ContentRoutes">
                <MyRoutes />
              </section>
            </Containter>
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

const Containter = styled.main`

  display:grid;
  grid-template-columns: 1fr;
  background-color: ${({ theme }) => theme.bgtotal};
  .ContentSidebar{
    display:none;
  }
  .ContentMenuambur{
    display: block;
    position: absolute;
    left 20px;
  }

  @media ${Device.tablet}{
    grid-template-colums: 65px 1fr;
    &.active{
    grid-template-colums: 220px 1fr;
    }
    .ContentSidebar{
      display: initial;
    }
    .ContentMenuambur{
      display: none;
              }
  }
  .ContentRoutes{
    grid.column: 1;
    width 100%;
    @media ${Device.tablet} {
      grid-colum: 2;
    }
  }

`;
export default App;
