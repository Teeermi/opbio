import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    console.log("Brak parametru code w zapytaniu");
    return new Response("Brak kodu autoryzacyjnego", { status: 400 });
  }

  console.log("Otrzymany kod:", code);

  try {
    // Wymiana kodu na token dostępu
    const params = new URLSearchParams();
    params.append("client_id", process.env.DISCORD_CLIENT_ID!);
    params.append("client_secret", process.env.DISCORD_CLIENT_SECRET!);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.DISCORD_REDIRECT_URI!);
    params.append("scope", "identify");

    const tokenResponse = await axios.post(
      "https://discord.com/api/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // Pobierz informacje o użytkowniku
    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log(userResponse.data);

    const { id, username, avatar } = userResponse.data;

    // Zwróć dane użytkownika
    return NextResponse.json({
      id,
      username,
      avatar: avatar
        ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
        : null,
    });
  } catch (error) {
    console.error("Błąd podczas wymiany kodu na token:", error);
    return new Response("Błąd podczas autoryzacji", { status: 500 });
  }
}
