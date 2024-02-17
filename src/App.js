import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from './pages/global/Topbar'
import Sidebar from "./pages/global/Sidebar";
import Dashboard from './pages/dashboard';
import Team from './pages/Team';
import Invoices from './pages/Invoices';
import Contacts from './pages/Contacts';
import Bar from './pages/Bar';
import Form from './pages/Form';
import Line from './pages/Line';
import Pie from './pages/Pie';
// import FAQ from './pages/FAQ';
import Geography from './pages/Geography';
import Calendar from './pages/Calendar';
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [theme, colorMode] = useMode();
  const isUserSignedIn = !!localStorage.getItem('token')
  console.log(isUserSignedIn)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {
            !isUserSignedIn ?
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
              :
              <>
                <Sidebar />
                <main className="content">
                  <Topbar />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/line" element={<Line />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/geography" element={<Geography />} />
                    <Route path="/calendar" element={<Calendar />} />
                  </Routes>
                </main>
              </>
          }
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
