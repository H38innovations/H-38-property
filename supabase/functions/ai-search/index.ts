import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("q");

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Query parameter 'q' is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Generate embedding for search query
    const model = new Supabase.ai.Session("gte-small");
    const queryEmbedding = await model.run(query, {
      mean_pool: true,
      normalize: true,
    });

    // Perform vector similarity search
    const { data, error } = await supabase.rpc("search_articles", {
      query_embedding: queryEmbedding,
      match_threshold: 0.3,
      match_count: 10,
    });

    if (error) {
      // Fallback to basic text search if RPC doesn't exist yet
      const { data: fallbackData, error: fallbackError } = await supabase
        .from("articles")
        .select("*")
        .textSearch("title", query, { type: "websearch" })
        .limit(10);

      if (fallbackError) throw fallbackError;

      return new Response(
        JSON.stringify({ results: fallbackData || [], method: "text" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ results: data || [], method: "vector" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});