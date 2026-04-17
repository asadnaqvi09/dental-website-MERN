const mongoose = require('mongoose');
const dotEnv = require('dotenv');
dotEnv.config();

const db_name = process.env.db_name;
const db_password = process.env.db_password;
const db_uri = `mongodb+srv://${db_name}:${db_password}@cluster0.lemgrbu.mongodb.net/${db_name}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(db_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to DB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;