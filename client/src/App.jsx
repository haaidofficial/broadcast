import { Home } from './components/home/Home';
import { Chat } from './components/chat/Chat';
import { SocketContextProvider } from './contexts/socket-context';


function App() {

  return (
    <SocketContextProvider>
      
      {/* <Chat /> */}
      <Home />
    </SocketContextProvider>
  );
}

export default App;
