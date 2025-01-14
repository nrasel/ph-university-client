import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtecTedRoute";

function App() {
  return (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  );
}

export default App;
