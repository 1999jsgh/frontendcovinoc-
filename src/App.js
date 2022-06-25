import './App.css';
import Footer from './footer/footer';
import AppRouter from './nav/AppRouter';
import StoreFromProvider from './store/State';

function App() {
  return (
    <StoreFromProvider>
      <AppRouter/>
      <Footer/>
    </StoreFromProvider>
  );
}

export default App;
