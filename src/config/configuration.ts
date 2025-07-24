export default () => {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error('DATABASE_URL is not defined in environment variables');
  }

  return {
    port,
    database: {
      url,
    },
  };
};
