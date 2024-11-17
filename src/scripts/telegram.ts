import { ChatListSetting } from "../types";

export class TelegramClientInjectedScript {
  chatlist: NodeListOf<HTMLDivElement> | null = null;
  observer: MutationObserver | null = null;
  settings: ChatListSetting;

  constructor(settings: ChatListSetting) {
    this.initializeChatlist();
    this.observe();
    this.settings = settings;
  }

  private initializeChatlist() {
    this.chatlist = document.getElementsByClassName("chatlist")[0]
      .childNodes as NodeListOf<HTMLDivElement>;
  }

  private observe() {
    if (this.observer) {
      // Observer already exists, do nothing
      return;
    }

    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "childList" &&
          (mutation.target as Element).className === "chatlist"
        ) {
          this.initializeChatlist();
          this._blur();
        }
      });
    });

    this.observer.observe(document.getElementsByClassName("chatlist")[0], {
      childList: true,
    });
  }

  private _blur() {
    if (this.chatlist) {
      this.chatlist.forEach((chat) => {
        const { wholeChat, name, avatar, message, blurRadius } = this.settings;
        if (wholeChat) {
          chat.style.filter = `blur(${blurRadius}px)`;
          return;
        }
        if (name) {
          (chat.getElementsByClassName("dialog-title")[0] as HTMLElement).style.filter =
            `blur(${blurRadius}px)`;
        }
        if (message) {
          (
            chat.getElementsByClassName("dialog-subtitle")[0] as HTMLElement
          ).style.filter = `blur(${blurRadius}px)`;
        }
        if (avatar) {
          (chat.getElementsByClassName("avatar")[0] as HTMLElement).style.filter =
            `blur(${blurRadius}px)`;
        }
      });
    }
  }

  private _unblur() {
    if (this.chatlist) {
      this.chatlist.forEach((chat) => {
        chat.style.removeProperty("filter");
        (
          chat.getElementsByClassName("dialog-title")[0] as HTMLElement
        ).style.removeProperty("filter");
        (
          chat.getElementsByClassName("dialog-subtitle")[0] as HTMLElement
        ).style.removeProperty("filter");
        (
          chat.getElementsByClassName("avatar")[0] as HTMLElement
        ).style.removeProperty("filter");
      });
    }

    // Disconnect the observer if it exists
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null; // Reset observer after disconnecting
    }
  }

  blur(settings: ChatListSetting) {
    this.settings = settings;
    this._blur();
  }

  unblur(settings: ChatListSetting) {
    this.settings = settings;
    this._unblur();
  }
}
