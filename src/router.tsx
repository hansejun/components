import { Route, Routes } from 'react-router-dom';
import AccordionPage from './pages/accordion';
import Layout from './components/layout/layout';
import HomePage from './pages/home';
import TabMenusPage from './pages/tab-menus';
import TooltipPage from './pages/tooltip';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/accordion" element={<AccordionPage />} />
        <Route path="/tabs" element={<TabMenusPage />} />
        <Route path='/tooltip' element={<TooltipPage/>} />
      </Route>
    </Routes>
  );
}
