export async function GET(request: Request) {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");

  if (!code) {
    console.log("Brak parametru code w zapytaniu");
    return new Response("Brak kodu autoryzacyjnego", { status: 400 });
  }

  console.log("Otrzymany kod:", code);

  return new Response(`Otrzymano kod: ${code}`, { status: 200 });
}
