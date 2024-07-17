import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <main className="p-[5vw]">
      <Outlet />
    </main>
  );
}
