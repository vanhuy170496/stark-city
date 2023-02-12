import { HomePage } from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminPage } from './pages/Admin';
import { useEffect } from 'react';

function App() {
  const url = new URL(window.location.href);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.protocol !== 'https:' && !url.host.includes('localhost')) {
      window.location.href = window.location.href.replace('http:', 'https:');
    }
  }, []);

  if (url.searchParams.get('admin1') === '1') {
    return <AdminPage />;
  }
  return (
    <>
      <HomePage />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
