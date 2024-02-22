import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import React from 'react';
import Stories from './components/stories';
import StoryDetail from './components/storydetail';

function App() {
 
  return (
    <Router>
      <div>
        <h1>Hacker News</h1>
        <Routes> 
          <Route exact path="/" element={<Stories />} />
          <Route path="/story/:id" element={<StoryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
