const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

// configuration - enable express to parse incoming json data
app.use(express.json());
const PORT = process.env.PORT || 3066;

const cors = require("cors");

app.use(cors());

mongoose.Promise = global.Promise;
const CONNECTION_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/dynamic-forms";
mongoose
  .connect(CONNECTION_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("successfully connected to db");
  })
  .catch(() => {
    console.log("error connecting to database");
  });

// user schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
});

// created forms schema
const createdFormSchema = {
  userId: {
    type: String,
    required: [true, "userId is required"],
  },

  form: {
    type: Schema.Types.Mixed,
  },
};

// responses schema
const responseSchema = {
  formId: {
    type: String,
  },
  formSubmittedAt: {
    type: String,
  },
  response: {
    type: Schema.Types.Mixed,
  },
};

// creating model from forms schema
const CreatedForm = mongoose.model("CreatedForm", createdFormSchema);
const User = mongoose.model("User", userSchema);
const Response = mongoose.model("Response", responseSchema);

// users api
// get all users
app.get("/all-users", (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.json(error);
    });
});

// add a new user
app.post("/add-user", (req, res) => {
  const body = req.body;
  const user = new User(body);

  // add a new user to the User Model
  user
    .save()
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

// get user by email
app.get("/get-user/:email", (req, res) => {
  const email = req.params.email;

  User.findOne({ email: email })
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

// forms api
// get all forms
app.get("/all-forms", (req, res) => {
  CreatedForm.find()
    .then(forms => {
      res.json(forms);
    })
    .catch(error => {
      res.json(error);
    });
});

// get all forms for a particular user
app.get("/all-forms-for-user/:userId", (req, res) => {
  const userId = req.params.userId;
  CreatedForm.find({ userId: userId })
    .then(forms => {
      res.json(forms);
    })
    .catch(error => {
      res.json(error);
    });
});

// get a particular form
app.get("/get-form/:form_id", (req, res) => {
  const id = req.params.form_id;

  CreatedForm.findById(id)
    .then(form => {
      res.json(form);
    })
    .catch(error => {
      res.json(error);
    });
});

// add a new form in createdForm model
app.post("/add-form", (req, res) => {
  const body = req.body;
  const createdForm = new CreatedForm(body);

  // adding the form to createdForm Model
  createdForm
    .save()
    .then(form => {
      res.json(form);
    })
    .catch(error => {
      res.json(error);
    });
});

// delete a form
app.delete("/delete-form/:_id", (req, res) => {
  const id = req.params._id;

  CreatedForm.findByIdAndDelete(id)
    .then(form => {
      res.json(form);
    })
    .catch(error => {
      res.json(error);
    });
});

// response apis
// add a response
app.post("/add-response", (req, res) => {
  const body = req.body;
  const response = new Response(body);

  // adding response to the Response model
  response
    .save()
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.json(error);
    });
});

// get all response for a particular form
app.get("/get-all-responses-for-a-particular-form/:form_id", (req, res) => {
  const id = req.params.form_id;

  Response.find({ formId: id })
    .then(responses => {
      res.json(responses);
    })
    .catch(error => {
      res.json(error);
    });
});

// get a particular response
app.get("/get-response/:id", (req, res) => {
  const id = req.params.id;

  Response.findById(id)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.json(error);
    });
});

// delete all responses when a form is deleted
app.delete("/delete-responses/:formId", (req, res) => {
  const id = req.params.formId;

  Response.deleteMany({ formId: id })
    .then(forms => {
      res.json(forms);
    })
    .catch(error => {
      res.json(error);
    });
});

// delete a particular response
app.delete("/delete-response/:_id", (req, res) => {
  const id = req.params._id;

  Response.findByIdAndDelete(id)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.json(error);
    });
});

app.get("/", (req, res) => {
  res.send("Welcome to the website");
});

app.listen(PORT, () => {
  console.log("server running on PORT:", PORT);
});
