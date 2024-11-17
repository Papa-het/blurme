import { BackgroundMessageType, ExtensionMessages } from "../types";

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === ExtensionMessages.BLUR) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        {
          action: BackgroundMessageType.BLUR,
          data: request.data,
        },
        (response) => {
          console.log("Response from content script:", response);
        }
      );
    });
    sendResponse({ status: "Message received by background script" });
  }

  if (request.type === ExtensionMessages.UNBLUR) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        {
          action: BackgroundMessageType.UNBLUR,
        },
        (response) => {
          console.log("Response from content script:", response);
        }
      );
    });
    sendResponse({ status: "Message received by background script" });
  }
});
