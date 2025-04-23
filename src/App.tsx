import "./App.css";

import Layout from "./components/layout/Layout";
import FlowPage from "./components/pages/FlowPage"
import Dashboard from "./components/routers/Dashboard";



function App() {
  return (
    <div className={`bg-tertiary-750`}>
      <Layout>
        <Dashboard />
      </Layout>
    </div>
  );
}

export default App;
