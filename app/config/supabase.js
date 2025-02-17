const { supabaseUrl, supabaseAnonKey } = require('../config');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;
