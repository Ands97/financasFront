import { Routes, Route } from 'react-router-dom';
import { BalanceProvider } from './contexts/BalanceContext';

import Footer from './components/Footer';

import Login from './pages/Login';
import Home from './pages/Home';
import Resume from './pages/Resume';
import {Statement} from './pages/Statement'
import { AuthProvider } from './contexts/AuthContext';
import { RequireAuth } from './components/RequireAuth';
import NotFound from './pages/NotFound';
import { TransactionProvider } from './contexts/TransactionContext';
import { Account } from './pages/Account';
import { Categories } from './pages/Categories';
import { Register } from './pages/Register';





function App() {

  return (
    <AuthProvider>
      <BalanceProvider>
        <TransactionProvider>
          <div className="container" style={{ overflowX:'hidden'}}>
              <div>
                <Routes>
                  <Route path='/' element={<Login />} />
                  <Route path='/login' element={<Login/>} />
                  <Route path='/register' element={<Register />}/>
                  <Route path='/resume' element={<RequireAuth><Resume /></RequireAuth>} />
                  <Route path='/accounts' element={<RequireAuth><Account/></RequireAuth>} />
                  <Route path='/categories' element={<RequireAuth><Categories/></RequireAuth>} />
                  <Route path='/statement' element={<RequireAuth><Statement/></RequireAuth>} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </div>
            <Footer />
          </div>
        </TransactionProvider>
      </BalanceProvider>
    </AuthProvider>
  );
}

export default App;
