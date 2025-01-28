"use client";
import "./main.css";

import {notFound, useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {findUserSettings} from "@/app/_actions/actions";

export default function Page() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [userSettings, setUserSettings] = useState<Record<string, unknown> | undefined>(undefined);



    useEffect(() => {
        async function fetchData() {
            const response = await findUserSettings(params.nick as string);


        console.log(response)

            if (response?.status === "error") {
                console.log("error");
            } else {
                setUserSettings(response);

                console.log(response);
            }
            setLoading(false);
        }
        fetchData();
    }, [params.nick])


    if (loading) return <div>Loading...</div>;
    if (!userSettings) return notFound();


    return <body style={{ background: `url(${userSettings.backGroundImg}) lightgray 50% / cover no-repeat` }} >
                <main style={{border: "1px solid #112E68"}} >
                        <div className="banner" style={{background: `url(${userSettings.bannerImg}) lightgray 50% / cover no-repeat`}} >

                        </div>
                        <div className="profile">
                            <div className="views">
                                <i className="fa-solid fa-eye"></i>
                                <h1>133</h1>
                            </div>

                                <div className="avatar">
                                    <div className="leftSide">
                                        <i className="fa-brands fa-spotify"></i>
                                        <i className="fa-brands fa-github"></i>
                                        <i className="fa-brands fa-youtube"></i>
                                        <i className="fa-brands fa-square-instagram"></i>
                                        <i className="fa-brands fa-steam"></i>
                                    </div>

                                    <img src={`${userSettings.avatarImg}`} alt=""/>

                                    <div className="leftSide2">
                                        <i className="fa-solid fa-chess-king"></i>
                                        <i className="fa-solid fa-code"></i>
                                    </div>




                                </div>

                            <div className="textContainer">
                                <h1>Termi</h1>
                                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h2>
                            </div>

                            <div className="wrapperDiscordStatus">
                                <div className="discordStatus">
                                    <div className="discordUp">
                                        <div className="wrapperDiscordLeft">

                                        <img src="/image%203.png" alt=""/>
                                        <div className="discordTextWrapper">
                                            <h1>@teeermi</h1>
                                            <h2>Spotify - 4min.</h2>
                                        </div>
                                        </div>
                                        <img src="/image%204.png" alt=""/>
                                    </div>

                                    <div className="discordDown">
                                        <div className="discordDownWrapper">
                                            <img src="/image%205.png" alt=""/>
                                            <div className="discordDownTextWrapper">
                                                <h1>Press Play</h1>
                                                <h2>P. Diddy</h2>
                                            </div>
                                        </div>
                                            <button>Listen</button>



                                    </div>
        
                                </div>
                            </div>


                        </div>

                </main>

                    <div className="linkedDiscord">

                    </div>
    </body>;
}
