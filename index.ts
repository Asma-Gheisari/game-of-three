import ExpressApp from "./src/app";
import { PORT } from "./src/configurations/deployment";

const app = new ExpressApp(PORT);
app.start();

export default app;
