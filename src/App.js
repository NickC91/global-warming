import React from "react";
import Layout from "./components/Layout"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NotFound from "./pages/NotFound"
import WarmingChart from "./pages/WarmingChart"
import Home from "./pages/Home"

function App() {

  return (
    <Router basename="/">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/warming/:type" element={<WarmingChart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;