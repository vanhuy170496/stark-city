import { HomePage } from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <HomePage />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
