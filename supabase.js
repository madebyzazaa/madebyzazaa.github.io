require('dotenv').config()

const {createClient} = require('@supabase/supabase-js')
const base = createClient(
    process.env.SUPABASE_URL, process.env.API_KEY
)

module.exports = {base}