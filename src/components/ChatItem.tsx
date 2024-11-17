import { useEffect, useRef, useState } from "react";
import { ExtensionMessages } from "../types";

const ChatItem = (): JSX.Element => {
  const [settings, setSettings] = useState({
    blurRadius: 3,
    wholeChat: false,
    name: false,
    message: false,
    avatar: false,
  });

  const onSettingsChange = (
    key: keyof typeof settings,
    value: boolean | number
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const chatRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    for (const key in settings) {
      if (!settings[key as keyof typeof settings]) {
        switch (key) {
          case "wholeChat":
            chatRef.current?.style.removeProperty("filter");
            break;
          case "name":
            nameRef.current?.style.removeProperty("filter");
            break;
          case "message":
            messageRef.current?.style.removeProperty("filter");
            break;
          case "avatar":
            avatarRef.current?.style.removeProperty("filter");
            break;
        }
      } else {
        switch (key) {
          case "wholeChat":
            chatRef.current?.style.setProperty(
              "filter",
              `blur(${settings.blurRadius}px)`
            );
            break;
          case "name":
            nameRef.current?.style.setProperty(
              "filter",
              `blur(${settings.blurRadius}px)`
            );
            break;
          case "message":
            messageRef.current?.style.setProperty(
              "filter",
              `blur(${settings.blurRadius}px)`
            );
            break;
          case "avatar":
            avatarRef.current?.style.setProperty(
              "filter",
              `blur(${settings.blurRadius}px)`
            );
            break;
        }
      }
    }
  }, [settings]);

  return (
    <div className="mt-4">
      <div className="border rounded-md p-2 mb-4">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Whole chat</span>
            <input
              type="checkbox"
              className="checkbox"
              checked={settings.wholeChat}
              onChange={(e) => onSettingsChange("wholeChat", e.target.checked)}
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Name</span>
            <input
              type="checkbox"
              className="checkbox"
              checked={settings.name}
              onChange={(e) => onSettingsChange("name", e.target.checked)}
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Message</span>
            <input
              type="checkbox"
              className="checkbox"
              checked={settings.message}
              onChange={(e) => onSettingsChange("message", e.target.checked)}
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Avatar</span>
            <input
              type="checkbox"
              className="checkbox"
              checked={settings.avatar}
              onChange={(e) => onSettingsChange("avatar", e.target.checked)}
            />
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm">Blur radius</label>
        <input
          type="range"
          min="0"
          max="10"
          className="range range-xs"
          value={settings.blurRadius}
          onChange={(e) =>
            onSettingsChange("blurRadius", parseInt(e.target.value))
          }
        />
      </div>

      <div
        ref={chatRef}
        className="flex gap-4 rounded-lg bg-neutral text-neutral-content p-2 w-full shadow-lg"
      >
        <div className="avatar">
          <div ref={avatarRef} className="w-16 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-1">
          <h3 ref={nameRef} className="font-medium">
            Alua Chestnut
          </h3>
          <p ref={messageRef} className="text-gray-400 text-md font-[300]">
            Через минут 20 буду у входа
          </p>
        </div>

        <div className="flex flex-col m-auto items-end gap-[12px]">
          <p className="text-gray-400 text-xs font-[300]">12:45</p>
          <div className="badge badge-accent">2</div>
        </div>
      </div>

      <button
        className="btn btn-primary mt-8 w-full"
        onClick={() => {
          chrome.runtime.sendMessage(
            { type: ExtensionMessages.BLUR, data: settings },
            (response) => {
              console.log("Response from background:", response);
            }
          );
        }}
      >
        Применить
      </button>

      <button
        onClick={() => {
          chrome.runtime.sendMessage(
            { type: ExtensionMessages.UNBLUR },
            (response) => {
              console.log("Response from background:", response);
            }
          );
        }}
        className="btn btn-secondary mt-2 w-full"
      >
        Сбросить
      </button>
    </div>
  );
};

export { ChatItem };
