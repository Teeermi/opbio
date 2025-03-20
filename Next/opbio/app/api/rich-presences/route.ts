// pages/api/discord.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID!);
    if (!guild) {
      return res.status(404).json({ message: "Guild not found" });
    }

    await guild.members.fetch();
    const members = guild.members.cache.map((member) => ({
      id: member.id,
      username: member.user.username,
      status: member.presence?.status || "offline",
    }));

    res.status(200).json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
