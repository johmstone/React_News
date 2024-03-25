import './App.css';
import { MainHeader } from './components/header';
import { Home } from './components/home';
import { MainFooter } from './components/mainFooter';

function App() {
  return (
    <div>
      <MainHeader />
      <Home />
      <MainFooter />
    </div>
  );
}

export default App;
