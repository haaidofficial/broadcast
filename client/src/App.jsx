import { SocketContextProvider } from './contexts/socket-context';
import { Main } from './components/Main';


function App() {

function replaceState(params) {
    window.history.pushState({user: 'Mohan singh'}, 'dummy', 'http://localhost:5200/?mid=:id');
}


  return (
    <SocketContextProvider>
      {/* <button onClick={replaceState}>
     onClick
      </button> */}
      <Main />
    </SocketContextProvider>
  );
}

export default App;
