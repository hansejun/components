import { Route, Routes } from 'react-router-dom';
import AccordionPage from './pages/accordion';
import Layout from './components/layout/layout';
import HomePage from './pages/home';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/accordion" element={<AccordionPage />} />
      </Route>
    </Routes>
  );
}
