import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ChatPage from "./components/ChatPage/ChatPage";
import InfoPage from "./components/InfoPage/InfoPage";
import PageProvider from "./PageProvider";

function App() {
  return (
    <PageProvider>
      <Router>
        <Routes>
          {/* <Route exact path="/" element={<HomePage />} /> */}
          <Route exact path="/" element={<ChatPage />} />
          <Route exact path="/info" element={<InfoPage />} />
        </Routes>
      </Router>
    </PageProvider>
  );
}

export default App;
