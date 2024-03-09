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
import { DataProvider } from "./context/DataContext";
import './assets/style/style.scss'
import MyAccount from "./pages/MyAccount";

function App() {
  const [theme, colorMode] = useMode();
  const isUserSignedIn = !!localStorage.getItem('token')

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <DataProvider>
          <div className="app">
            {
              !isUserSignedIn ?
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
                :
                <>
                  <CssBaseline />
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
                      <Route path="/myaccount" element={<MyAccount />}/>
                    </Routes>
                  </main>
                </>
            }
          </div>
        </DataProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
