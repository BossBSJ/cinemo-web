import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import ThemeProvider from './theme';
import { Provider } from 'react-redux';
import store from './store'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
            <Router/>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
