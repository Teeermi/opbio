"use client";

import { Navbar } from "@/components/navbar";
import Form from "next/form";
import { updateUserSettings } from "../../actions/actions";

export default function Page() {
  async function handleSubmit(formData: FormData) {
    await updateUserSettings(formData);
  }

  return (
    <div className="flex justify-between">
      <Navbar />
      <Form
        action={handleSubmit}
        className="grid content-center w-full grid-cols-2 gap-4"
      >
        <div className="flex flex-col">
          <label className="text-[0.8125rem] font-semibold leading-normal font-onest text-[rgba(217,217,217,0.47)]">
            Slash
          </label>
          <input name="slash" className="rounded-lg" type="text" />
        </div>

        <div className="flex flex-col">
          <label className="text-[0.8125rem] font-semibold leading-normal font-onest text-[rgba(217,217,217,0.47)]">
            Nick
          </label>
          <input name="nick" className="rounded-lg" type="text" />
        </div>

        <div className="flex flex-col">
          <label className="text-[0.8125rem] font-semibold leading-normal font-onest text-[rgba(217,217,217,0.47)]">
            Background Image
          </label>
          <input name="backGroundImg" className="rounded-lg" type="text" />
        </div>

        <div className="flex flex-col">
          <label className="text-[0.8125rem] font-semibold leading-normal font-onest text-[rgba(217,217,217,0.47)]">
            Avatar Image
          </label>
          <input name="avatarImg" className="rounded-lg" type="text" />
        </div>

        <div className="flex flex-col">
          <label className="text-[0.8125rem] font-semibold leading-normal font-onest text-[rgba(217,217,217,0.47)]">
            Banner Image
          </label>
          <input name="bannerImg" className="rounded-lg" type="text" />
        </div>

        <div className="flex flex-col">
          <label className="text-[0.8125rem] font-semibold leading-normal font-onest text-[rgba(217,217,217,0.47)]">
            Main Border Color
          </label>
          <input name="mainBorderColor" className="rounded-lg" type="text" />
        </div>

        <div className="flex flex-col">
          <label className="text-[0.8125rem] font-semibold leading-normal font-onest text-[rgba(217,217,217,0.47)]">
            Links Table
          </label>
          <input name="linksTable" className="rounded-lg" type="text" />
        </div>

        <div className="flex flex-col">
          <label className="text-[0.8125rem] font-semibold leading-normal font-onest text-[rgba(217,217,217,0.47)]">
            Groups Table
          </label>
          <input name="groupsTable" className="rounded-lg" type="text" />
        </div>

        <div className="flex flex-col">
          <label className="text-[0.8125rem] font-semibold leading-normal font-onest text-[rgba(217,217,217,0.47)]">
            Profile Description
          </label>
          <input name="profileDescription" className="rounded-lg" type="text" />
        </div>

        <div className="flex flex-col">
          <label className="text-[0.8125rem] font-semibold leading-normal font-onest text-[rgba(217,217,217,0.47)]">
            Discord Info
          </label>
          <input name="discordInfo" className="rounded-lg" type="text" />
        </div>

        <div className="flex flex-col">
          <label className="text-[0.8125rem] font-semibold leading-normal font-onest text-[rgba(217,217,217,0.47)]">
            Views
          </label>
          <input name="views" className="rounded-lg" type="text" />
        </div>

        <div className="flex flex-col">
          <label className="text-[0.8125rem] font-semibold leading-normal font-onest text-[rgba(217,217,217,0.47)]">
            Discord Status Border Color
          </label>
          <input
            name="discordStatusBorderColor"
            className="rounded-lg"
            type="text"
          />
        </div>

        <button>Submit</button>
      </Form>
    </div>
  );
}
