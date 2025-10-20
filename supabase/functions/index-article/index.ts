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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { url, title, tag, brief, content, image, author, date } = await req.json();

    if (!url || !title) {
      return new Response(
        JSON.stringify({ error: "url and title are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Generate embedding using Supabase AI
    const textToEmbed = `${title} ${brief} ${content}`.substring(0, 1000);
    const session = new Supabase.ai.Session("gte-small");
    const embedding = await session.run(textToEmbed, {
      mean_pool: true,
      normalize: true,
    });

    // Upsert article with embedding
    const { data, error } = await supabase
      .from("articles")
      .upsert(
        {
          url,
          title,
          tag: tag || "",
          brief: brief || "",
          content: content || "",
          image: image || "",
          author: author || "",
          date: date || "",
          embedding,
        },
        { onConflict: "url" }
      )
      .select()
      .maybeSingle();

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, article: data }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});