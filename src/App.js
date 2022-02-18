import {Routes, Route} from 'react-router-dom';
import { BalanceProvider } from './contexts/balanceContext';

import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';



function App() {
  return (
    <BalanceProvider>
      <div className="container">
        <Header/>
          <div>
            <Routes>
              <Route path='/' element={<Home/>}/>
            </Routes>
          </div>
        <Footer/>
      </div>
    </BalanceProvider>
  );
}

export default App;
