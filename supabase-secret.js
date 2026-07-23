require('dotenv').config()

const {createClient} = require('@supabase/supabase-js')
const secret = createClient(
    process.env.SUPABASE_URL, process.env.SECRET_KEY
)

module.exports = {secret}