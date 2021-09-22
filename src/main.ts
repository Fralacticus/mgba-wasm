import ModalWrapper from "./components/ModalWrapper.svelte";
import "./index.pcss";
const app = new ModalWrapper({
  target: document.getElementById("app"),
});

export default app;
