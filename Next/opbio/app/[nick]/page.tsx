"use client";
import "./main.css";

import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { findUserSettings } from "@/app/_actions/actions";

export default function Page() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  interface UserSettings {
    backGroundImg: string;
    mainBorderColor: string;
    bannerImg: string;
    views: number;
    linksTable: string;
    avatarImg: string;
    groupsTable: string;
    nick: string;
    profileDescription: string;
  }

  const [userSettings, setUserSettings] = useState<UserSettings | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchData() {
      const response = await findUserSettings(params.nick as string);

      if ("status" in response && response.status === "error") {
        console.log("error");
      } else {
        setUserSettings(response as UserSettings);

        console.log(response);
      }
      setLoading(false);
    }
    fetchData();
  }, [params.nick]);

  if (loading) return <div>Loading...</div>;
  if (!userSettings) return notFound();

  return (
    <body
      style={{
        background: `url(${userSettings.backGroundImg}) lightgray 50% / cover no-repeat`,
      }}
    >
      <main style={{ border: `1px solid ${userSettings.mainBorderColor}` }}>
        <div
          className="banner"
          style={{
            background: `url(${userSettings.bannerImg}) lightgray 50% / cover no-repeat`,
          }}
        ></div>
        <div className="profile">
          <div className="views">
            <i className="fa-solid fa-eye"></i>
            <h1>{String(userSettings.views)}</h1>
          </div>

          <div className="avatar">
            <div className="leftSide">
              {JSON.parse(userSettings.linksTable as string).map(
                (link: { name: string; link: string; icon: string }) => {
                  return (
                    <i key={link.name} className={`fa-brands ${link.icon}`}></i>
                  );
                }
              )}
            </div>

            <img src={`${userSettings.avatarImg}`} alt="" />

            <div className="leftSide2">
              {JSON.parse(userSettings.groupsTable as string).map(
                (link: { name: string; icon: string }) => {
                  return (
                    <i key={link.name} className={`fa-solid ${link.icon}`}></i>
                  );
                }
              )}
            </div>
          </div>

          <div className="textContainer">
            <h1>{userSettings.nick}</h1>
            <h2>{userSettings.profileDescription}</h2>
          </div>

          <div className="wrapperDiscordStatus">
            <div className="discordStatus">
              <div className="discordUp">
                <div className="wrapperDiscordLeft">
                  <img src="/image%203.png" alt="" />
                  <div className="discordTextWrapper">
                    <h1>@teeermi</h1>
                    <h2>Spotify - 4min.</h2>
                  </div>
                </div>
                <img src="/image%204.png" alt="" />
              </div>

              <div className="discordDown">
                <div className="discordDownWrapper">
                  <img src="/image%205.png" alt="" />
                  <div className="discordDownTextWrapper">
                    <h1>Press Play</h1>
                    <h2>P. </h2>
                  </div>
                </div>
                <button>Listen</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="linkedDiscord"></div>
    </body>
  );
}
