import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`api-gateway-bff listening on port ${PORT}`);
});
