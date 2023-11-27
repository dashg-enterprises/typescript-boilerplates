import React from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./Router";
import { Provider } from "react-redux";
import { store } from "./state/store";

const root = document.getElementById("root");
const reactRoot = createRoot(root!);
reactRoot.render(<Provider store={store}><AppRouter /></Provider>);