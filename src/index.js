import express from 'express';
import { setupApp } from './plugins';
import { PORT } from './config/env';

const app = express();

setupApp(app);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app;
