const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const con = require('./RecipeDatabase');
const path = require("path");

app.use(cors({origin: "http://localhost:3000"}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());

app.post("/register", (req, res) => {
  const { username, email, password, gender } = req.body;

  // Validate input data
  if (!username || !email || !password || !gender) {
    return res.status(400).send("All fields are required.");
  }

  // Encrypt password (using bcryptjs)
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).send("Server error.");
    }

    const query = `INSERT INTO api_users (username, email, password_hash, gender) VALUES (?, ?, ?, ?)`;
    con.query(query, [username, email, hashedPassword, gender], (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).send("Error registering user.");
      }

      res.status(201).send("User registered successfully.");
    });
  });
});


app.post("/login", (req, res) => {
  const {username, password} = req.body;

  const query = "SELECT * FROM api_users WHERE username = ?";
  con.query(query, [username], async(err, results) =>{
    if (err) {
      console.error("Error logging in:", err);
      return res.status(500).json({ message: "Error logging in"});
    }

    if(results.length === 0) {
      return res.status(401).json({message : "Invalid credentials"});
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if(!isPasswordValid){
      return res.status(401).json({ message: "invalid credentials."});
    }

    const token = jwt.sign(
      {id: user.id, username: user.username},
      "your_secret_key",
      {expiresIn: "1h"}
    );

    console.log(token);
    res.json({ token });
  });
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Access token required." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    req.user = user; // Attach user info to the request
    next();
  });
};


const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, "uploads/");
  },
  filename: (req, file, cb) =>{
    cb(null, file.fieldname+ "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload =multer({ storage: storage });

app.post("/submit-recipe", upload.single("recipe_image"), (req, res) => {
  const { recipe_name,recipe_category, recipe_owner, instructions, ingredients } = req.body;

  const recipeImage = req.file.filename;
  console.log("Recipe Image Filename",recipeImage);

  if(!recipe_name||!recipe_category||!recipe_owner||!instructions||!ingredients||!recipeImage){
    return res.status(400).send("All fields are required.");
  }

  // Handle the file and text data
  console.log("Recipe Name:", recipe_name);
  console.log("Recipe Category:", recipe_category);
  console.log("Recipe Owner:", recipe_owner);
  console.log("Instructions:", instructions);
  console.log("Ingredients:", ingredients);
  console.log("Recipe Image:", recipeImage);

  // Save to database (example with pseudo-code)
  const query = `
  INSERT INTO recipes (recipe_name,recipe_category, recipe_owner, recipe_image, ingredients,instructions) 
  VALUES (?,?,?,?,?,?)`;

  con.query(
    query,
    [recipe_name,recipe_category,recipe_owner,recipeImage,ingredients,instructions],
    (err, results) => {
      if (err) {
        console.error("Error inserting data into database:", err);
        res.status(500).send("Error saving recipe to database.");
      } else {
        console.log("Recipe inserted with ID:", results.insertId);
      }
    }
  );
  res.status(200).send("Recipe submitted successfully!");
});

app.use("/uploads", express.static("uploads"));

app.get("/api/users", authenticateToken, (req, res) => {
  const query = "SELECT id, username, email, gender FROM api_users";
  con.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).send("Error retrieving users.");
    }
    res.json(results);
  });
});

app.get("/api/users/:identifier", authenticateToken, (req, res) => {
  const { identifier } = req.params;
  const query = "SELECT id, username, email, gender FROM api_users WHERE id = ? OR email = ?";
  con.query(query, [identifier, identifier], (err, results) => {
    if (err) {
      console.error("Error fetching user details:", err);
      return res.status(500).send("Error retrieving user details.");
    }
    if (results.length === 0) {
      return res.status(404).send("User not found.");
    }
    res.json(results[0]);

  });
});


app.get("/api/users/gender/:gender", authenticateToken, (req, res) => {
  const { gender } = req.params;
  const query = "SELECT id, username, email FROM api_users WHERE gender = ?";
  con.query(query, [gender], (err, results) => {
    if (err) {
      console.error("Error fetching users by gender:", err);
      return res.status(500).send("Error retrieving users by gender.");
    }
    res.json(results);
  });
});

app.get("/api/recipes", (req, res) => {
  const query = "SELECT recipe_id, recipe_name, recipe_image, recipe_category FROM recipes";
  con.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching recipes:", err);
      return res.status(500).send("Error retrieving recipes.");
    }
    res.json(results);
  });
});

app.get("/api/recipes/:id", (req, res) => {
  const { id } = req.params; // Extract recipe ID from URL
  const query = "SELECT * FROM recipes WHERE recipe_id = ?";
  con.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching recipe details:", err);
      return res.status(500).send("Error retrieving recipe details.");
    }
    if (results.length === 0) {
      return res.status(404).send("Recipe not found.");
    }
    res.json(results[0]); // Return recipe details
  });
});

app.get("/api/recipes/category/:category", (req, res) => {
  const { category } = req.params; // Extract category from URL
  const query = "SELECT recipe_id, recipe_name, recipe_image FROM recipes WHERE recipe_category = ?";
  con.query(query, [category], (err, results) => {
    if (err) {
      console.error("Error fetching recipes by category:", err);
      return res.status(500).send("Error retrieving recipes by category.");
    }
    res.json(results); // Return recipes filtered by category
  });
});

app.get("/api/recipes/user/:userId", authenticateToken, (req, res) => {
  const { userId } = req.params; // Extract user ID from URL
  const query = "SELECT recipe_id, recipe_name, recipe_image FROM recipes WHERE recipe_owner = ?";
  con.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching recipes by user:", err);
      return res.status(500).send("Error retrieving recipes by user.");
    }
    res.json(results); // Return recipes owned by the user
  });
});

app.get("/recipes", (req,res) =>{
  const query = "SELECT recipe_id, recipe_name, recipe_image ,recipe_category FROM recipes";

  con.query(query, (err,rows)=>{
    if(err){
      console.error("Error fetching recipes:", err);
      return res.status(500).send("Error retrieving recipes from database.");
    } else {
      const recipes = rows.map((row)=>({
        ...row,
        recipeImage: row.recipeImage,
      }))
      res.json(recipes);
    }
  });
});

app.get("/recipe/:id", (req,res) => {
  const recipe_id = req.params.id;
  const query = "SELECT * FROM recipes WHERE recipe_id = ?";

  con.query(query, [recipe_id], (err, rows)=>{
    if(err){
      console.error("Error fetching recipe:", err);
      return res.status(500).send("Error retrieving recipe details.");
    }
    if (rows.length > 0){
      const recipe = rows[0];
      res.json({
        recipeId: recipe.recipe_id,
        recipe_name: recipe.recipe_name,
        recipe_owner: recipe.recipe_owner,
        recipeImage: recipe.recipe_image,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions
      });
    }else{
      res.status(404).send("Recipe not found.");
    }
  });
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
