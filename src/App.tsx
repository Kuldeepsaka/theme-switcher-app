import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Contact from './components/pages/Contact';
import BlankLayout from './components/layouts/BlankLayout';
import Login from './components/pages/auth/Login';
import Examples from './components/pages/Examples';
import ExamplePage from './components/pages/examples/ExamplePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout with header */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/examples/:slug" element={<ExamplePage />} />
        </Route>

        {/* Optional layout without header */}
        <Route element={<BlankLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
