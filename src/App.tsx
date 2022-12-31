import { AppProvider } from "@/providers/app";
import { AppRoutes } from "@/routes";

/**
 * Appのルート
 * 個々のProviderはここに書かないこと
 */
function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
