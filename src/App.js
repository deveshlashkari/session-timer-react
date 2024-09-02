import { ChakraProvider } from "@chakra-ui/react";
import TimerDashboard from "./components/TimerDashboard";
function App() {
  return (
    <>
      <ChakraProvider>
        <TimerDashboard />
      </ChakraProvider>
    </>
  );
}

export default App;
