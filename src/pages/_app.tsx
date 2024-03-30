// import { type Session } from "next-auth";

// import { type AppType } from "next/app";
// import { Inter } from "next/font/google";



// import { StyledEngineProvider } from '@mui/material/styles';


// import { api } from "~/utils/api";



// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });





// import { useState, useEffect } from 'react';
// import { SessionProvider } from "next-auth/react";
// import { ThemeProvider, CssBaseline, Box, CircularProgress } from "@mui/material";
// import theme from "~/styles/theme";
// import ScrollToTop from "~/components/ScrollToTop";
// import AppHeader from "~/components/Header";
// import Sidebar from "~/components/Sidebar";
// import axios from 'axios';
// import "~/styles/globals.css";

// // Assuming your course item type is defined somewhere accessible
// interface CourseItem {
//   name: string;
//   type?: 'course' | 'coursefolder';
//   children?: CourseItem[];
// }

// const MyApp: AppType<{ session: Session | null }> = ({
//   Component,
//   pageProps: { session, ...pageProps  },
// }) => {
//   const [data, setData] = useState<CourseItem[]>([]);
//   const [selectedKey, setSelectedKey] = useState<string>('1');
//   const [collapsed, setCollapsed] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     setLoading(true);
//     axios.get(`/data.json`)
//       .then((res) => {
//         setData(res.data.children);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   const handleDrawerToggle = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <SessionProvider session={session}>
//       <StyledEngineProvider injectFirst>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <ScrollToTop />
//         <Box display="flex">
//           <Sidebar
//             data={data}
//             selectedKey={selectedKey}
//             setSelectedKey={setSelectedKey}
//             collapsed={collapsed}
//             handleDrawerToggle={handleDrawerToggle}
//             drawerWidth={240} // Adjusted drawerWidth to a reasonable value
//           />
//           <Box component="main" className={`flex-grow ${collapsed ? 'ml-0' : 'ml-[240px]'}`}>
//             <AppHeader onSearch={(query) => {}} jsonData={data} />
//             {loading ? (
//               <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//                 <CircularProgress />
//               </Box>
//             ) : (
//             <main className={`font-sans ${inter.variable}`}>
// {/* //         <Component {...pageProps} /> */}
//             <Component {...pageProps} data={data} selectedKey={selectedKey} setSelectedKey={setSelectedKey} setCollapsed={setCollapsed} />
//             </main>
//             )}
//           </Box>
//         </Box>
//       </ThemeProvider>
//       </StyledEngineProvider>
//     </SessionProvider>
//   );
// };

// export default api.withTRPC(MyApp);

// pages/_app.tsx
import { type AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from '../styles/theme'; 
import Layout from '../components/Layout'; 
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/globals.css'; 
import ScrollToTop from '~/components/ScrollToTop';
import AppFooter from '~/components/Footer';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const [data, setData] = useState([]);
  const [selectedKey, setSelectedKey] = useState('1');
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data.json');
        setData(response.data.children);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [  ]);

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScrollToTop />
        <Layout
          data={data}
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
        >
          <Component {...pageProps} data={data} selectedKey={selectedKey} setSelectedKey={setSelectedKey} setCollapsed={setCollapsed} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default MyApp;
