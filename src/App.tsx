import { HomePage } from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminPage } from './pages/Admin';

function App() {
  const url = new URL(window.location.href);
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
