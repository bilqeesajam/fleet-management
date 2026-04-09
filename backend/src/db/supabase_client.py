import os
from supabase import create_client, Client

SUPABASE_URL = os.environ.get("SUPABASE_PROJECT_URL")
SUPABASE_PUBLISHABLE_KEY = os.environ.get("SUPABASE_PUBLISHABLE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)

response = supabase.table("vehicles").select("*").limit(5).execute()
print(response.data)