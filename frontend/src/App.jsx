import { useState } from "react";
import { Images } from "./components/Images";
import { Generate } from "./components/Generate";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="appContainer">
      <Generate />
      <Images />
    </div>
  );
}

export default App;
