const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  jwtSecret: process.env.JWT_SECRET,
};
