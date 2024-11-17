import { ClientType, BackgroundMessageType, ChatListSetting } from "../types";
import { TelegramClientInjectedScript } from "./telegram";

// Store the instance globally
let telegramClient: TelegramClientInjectedScript | null = null;

// content-script.js
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  let client: ClientType = ClientType.WHATSAPP;
  console.log("Message received from background:", message);

  if (window && window.location) {
    if (window.location.href.includes("web.whatsapp.com")) {
      client = ClientType.WHATSAPP;
    } else if (window.location.href.includes("web.telegram.org")) {
      client = ClientType.TELEGRAM;
    }
  }

  if (client === ClientType.TELEGRAM) {
    if (!telegramClient) {
      telegramClient = new TelegramClientInjectedScript(
        message.data as ChatListSetting
      );
    }

    if (message.action === BackgroundMessageType.BLUR) {
      telegramClient.blur(message.data);
    }

    if (message.action === BackgroundMessageType.UNBLUR) {
      telegramClient.unblur(message.data);
    }
  }

  sendResponse({ response: "Hello from content script!" });
});
