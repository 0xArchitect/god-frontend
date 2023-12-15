import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ChatPage from "./components/ChatPage/ChatPage";
import PageProvider from "./PageProvider";

function App() {
  return (
    <PageProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </PageProvider>
  );
}

export default App;
