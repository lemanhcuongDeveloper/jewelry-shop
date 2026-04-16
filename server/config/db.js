import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lemanhcuong4102003!", 
  database: "jewelry_shop"
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB Error:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

export default db;