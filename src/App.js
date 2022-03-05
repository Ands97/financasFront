import { Routes, Route } from 'react-router-dom';
import { BalanceProvider } from './contexts/BalanceContext';

import Header from './components/Header';
import Footer from './components/Footer';

import Login from './pages/Login';
import Home from './pages/Home';
import Resume from './pages/Resume';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { RequireAuth } from './components/RequireAuth';
import NotFound from './pages/NotFound';





function App() {

  return (
    <AuthProvider>
      <BalanceProvider>
        <div className="container" style={{ overflowX:'hidden'}}>
              <div>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login/>} />
                  <Route path='/resume' element={<RequireAuth><Resume /></RequireAuth>} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </div>
            <Footer />
          </div>
      </BalanceProvider>
    </AuthProvider>
  );
}

export default App;
