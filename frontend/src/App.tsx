import "./App.css";
import MainBoard from "./components/main-board/main-board.component";
import SideBar from "./components/sidebar/sidebar.component";

function App() {
  return (
    <div className="app-container">
      <div className="app-container-left">
        <SideBar />
      </div>
      <div className="app-container-right">
        <MainBoard />
      </div>
    </div>
  );
}

export default App;
