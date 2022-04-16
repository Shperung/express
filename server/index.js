import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";

import schema from "./schema.mjs";
import users from "./users.mjs";

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());

const createUser = (input) => {
  const id = Date.now();
  return {
    id,
    ...input,
  };
};

const root = {
  getAllUsers: () => users,
  getUser: ({ id }) => users.find((user) => user.id == id),
  createUser: ({ input }) => {
    const user = createUser(input);
    users.push(user);
    return user;
  },
};

// візуальна діч для graphq
app.use(
  "/express/graphgl",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

app.get("/express", (req, res) => {
  res.send("<h1>Hello Express.</h1>");
});

app.listen(port, () => {
  console.log(`API starded in http://localhost:${port}/ .......`);
});
