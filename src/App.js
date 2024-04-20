
import './App.css';
import WeatherApp from './Components/WeatherApp/WeatherApp';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <div className="App">
      <WeatherApp/>
      </div>
    </ChakraProvider>
        
  );
}

export default App;
