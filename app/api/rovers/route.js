// app/api/rovers/route.js

export async function GET(request) {
    // Get query parameters from the request URL
    const url = new URL(request.url);
    const roverId = url.searchParams.get("roverId");
    const dataType = url.searchParams.get("dataType");
  
    // Check if roverId or dataType are missing
    if (!roverId || !dataType) {
      return new Response(
        JSON.stringify({ error: "Missing roverId or dataType" }),
        { status: 400 }
      );
    }
  
    try {
      // Construct the Flask API URL
      const flaskAPI = `http://localhost:5050/rovers/${roverId}/${dataType}`;
  
      // Fetch data from Flask API
      const flaskRes = await fetch(flaskAPI);
      if (!flaskRes.ok) {
        throw new Error('Failed to fetch data from Flask API');
      }
  
      const data = await flaskRes.json();
  
      // Return data from Flask API
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch rover data' }),
        { status: 500 }
      );
    }
  }
  