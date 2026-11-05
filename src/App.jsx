import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Intro from "./components/Intro.jsx";
import Cursor from "./components/Cursor.jsx";
import Nav from "./components/Nav.jsx";
import ContactPlayground from "./components/ContactPlayground.jsx";
import Footer from "./components/Footer.jsx";
import SoundToggle from "./components/SoundToggle.jsx";
import sound from "./lib/sound.js";

import Home from "./pages/Home.jsx";
import Experience from "./pages/Experience.jsx";
import Skills from "./pages/Skills.jsx";
import Education from "./pages/Education.jsx";
import Contact from "./pages/Contact.jsx";

/* Add a page here + a link in components/Nav.jsx */
const ROUTES = [
  { path: "/", element: <Home /> },
  { path: "/experience", element: <Experience /> },
  { path: "/skills", element: <Skills /> },
  { path: "/education", element: <Education /> },
  { path: "/contact", element: <Contact /> },
];

export default function App() {
  const location = useLocation();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  /* global hover / click sounds */
  useEffect(() => sound.attachGlobal(), []);

  return (
    <>
      <Intro onEnter={() => setEntered(true)} />
      <Cursor />
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            {ROUTES.map((r) => (
              <Route key={r.path} path={r.path} element={r.element} />
            ))}
            <Route path="*" element={<Home />} />
          </Routes>
          {/* The sticker playground shows at the bottom of every page except /contact */}
          {location.pathname !== "/contact" && <ContactPlayground />}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <SoundToggle />
    </>
  );
}
