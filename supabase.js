//file ini untuk integrate BE ke DB Supabase

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://igouxfozxbvsfrnbqaxo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlnb3V4Zm96eGJ2c2ZybmJxYXhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAxNzM1NzcsImV4cCI6MjAwNTc0OTU3N30.bFeaUcavpbH6tU43Q8t0R81KSxr7SfK949Vpr195X0A';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
