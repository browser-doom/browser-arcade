import EmscriptenModule from "./EmscriptenModule";
import RuntimeContext from "./RuntimeContext";

type EmscriptenProgram = (module: RuntimeContext) => EmscriptenModule;