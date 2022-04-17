import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import fs from "fs";
import { buildSchema } from "graphql";

// import schema from "./schema.mjs";
import users from "./users.mjs";

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());

const schemaString = fs.readFileSync("./server/schema.graphql", {
  encoding: "utf8",
});
const schema = buildSchema(schemaString);

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

/* приклад для візуалної дічі
# alt/ctrl - click - показує типи

fragment UserFragment on User {
  id, username, age,
}

fragment PostFragment on Post {
  id, title, content
}

# mutation {
#   createUser(input: {
#     username: "User4",
#     age: 22
#   }) {
#     id, username
#   }
# }

# query {
#   getAllUsers {
#     id, username, age, posts {
#       id, title, content
#     }
#   }
# }

query {
  getAllUsers {
    ...UserFragment
    posts {
      ...PostFragment
    }
  }
}

# query {
#   getUser(id: 1) {
#     id, username
#   }
# }

*/
