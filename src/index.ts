import { createApp } from './app';

const PORT = process.env.PORT || 4000;

createApp().then(app => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
