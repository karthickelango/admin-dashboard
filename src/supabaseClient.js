import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://mpohdufvbbhhugqpecbg.supabase.co'
const supabaseAnonkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wb2hkdWZ2YmJoaHVncXBlY2JnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwOTI3MDQzNCwiZXhwIjoyMDI0ODQ2NDM0fQ.2JaNiuA-_dJr2B-8SK0IoJ91PSsn6qYQu2YaMi3jSFk'

export const supabase = createClient(supabaseUrl, supabaseAnonkey)