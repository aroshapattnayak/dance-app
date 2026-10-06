import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import CaseNarthana from "./pages/CaseNarthana.jsx";
import CaseForge from "./pages/CaseForge.jsx";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // Hash router: pathname is the route, hash is any in-page anchor.
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/narthana" element={<CaseNarthana />} />
          <Route path="/work/forge" element={<CaseForge />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
