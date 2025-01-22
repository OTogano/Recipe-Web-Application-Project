const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_db_b'
})

con.connect((err)=>{
    if(err) {
        console.error('Database could not connect:', err);
        process.exit(1);
    }
    console.log('Database connected successfully!');
});

const insertRecipe = (recipeData, callback) => {
    const {recipename,recipeowner,recipeimage,ingredientsTextarea,instructions}= recipeData;
    const sql = `INSERT INTO recipes (recipe_name, recipe_owner, recipe_image, ingredients,instructions) VALUES (?,?,?,?,?)`;
    const values = [recipename,recipeowner,recipeimage,ingredientsTextarea,instructions];

    con.query(sql, values, callback);
};

function getAllRecipes(callback){
    const sql = `SELECT recipe_name FROM recipes`;
    con.query(sql,callback);
}

function getRecipesByName(name, callback){
    const sql = `SELECT * FROM recipes WHERE recipe_name = ?`;
    con.query(sql, [name], (err, results) =>{
        if (err) return callback(err);
        callback(null, results[0]);
    });
}

module.exports = {insertRecipe, getAllRecipes, getRecipesByName }; 
