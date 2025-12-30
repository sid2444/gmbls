<script type="module">
  import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

  const SUPABASE_URL = "https://vmcdlhwovcswxxfhdfiy.supabase.co"
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtY2RsaHdvdmNzd3h4ZmhkZml5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MjMzMzEsImV4cCI6MjA4MTk5OTMzMX0.mhS8BBtuH8xAAG3B469jkcefgm73O9rVw7XBZCgWFjE"

  window.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
</script>
