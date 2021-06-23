import "./App.css";
import GdriveFiles from "./comps/FilesList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GdriveFiles />
      </header>
    </div>
  );
}

export default App;

// will have button, gdrivefiles, and modal comps
// the gdrivefiles will have isVisibale state
// modal will have the same and state and will take the file list place
// modal will show each selected file and it's status
// waiting, baking or done
// ONLY need one button "bake files"

// could also add a way to choose which clients items you want access to

// also everything may chnage to s3 but that shouldn't be too much of a refactor
