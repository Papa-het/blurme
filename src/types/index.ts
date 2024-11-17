export enum BackgroundMessageType {
  BLUR = "@background/BLUR",
  UNBLUR = "@background/UNBLUR",
}

export enum ExtensionMessages {
  BLUR = "@extension/BLUR",
  UNBLUR = "@extension/UNBLUR",
}

export enum ClientType {
  TELEGRAM = "TELEGRAM",
  WHATSAPP = "WHATSAPP",
}

export interface ChatListSetting {
  blurRadius: number;
  name: boolean;
  avatar: boolean;
  message: boolean;
  wholeChat: boolean;
}

export interface ChatSetting {
  blurRadius: number;
}
