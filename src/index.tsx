import * as React from "react";
import { render } from "react-dom";
import App from "./components/App";
import v from  "./modules/NetworkStructure";
const rootEl = document.getElementById("root");
console.log(v)

render(<App />, rootEl);
