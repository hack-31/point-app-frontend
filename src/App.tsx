import { AppRoutes } from "@/routes";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <AppRoutes />
    </RecoilRoot>
  );
}

export default App;
