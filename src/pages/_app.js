import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NextTopLoader from "nextjs-toploader";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
        <ToastContainer />
        <Footer />
      </SessionProvider>
      <NextTopLoader
        color="#058eff"
        height={3}
        crawl={false}
        showSpinner={false}
        easing="ease"
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      />
    </>
  );
}
