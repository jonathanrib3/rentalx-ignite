import { app } from "./app";

app.listen(process.env.SERVER_PORT, () =>
  console.log(
    `Server running on http://${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}`
  )
);
