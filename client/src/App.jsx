import { SocketContextProvider } from './contexts/socket-context';
import { Main } from './components/Main';


function App() {

  return (
    <SocketContextProvider>
      <Main />
    </SocketContextProvider>
  );
}

export default App;
