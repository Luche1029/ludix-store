export interface SettingsResponse {
  success: boolean;
  settings: SettingsCategory;
}

export interface SettingsCategory {
    pinEnabled: boolean;
    lang: string;
    handler: number;
    loginType: number;
    shippingType: number;
    linkEnabled: boolean;
    storeEnabled: boolean;
    banner:string;
    maxPcSold:number;
    showUserData: boolean;
    whiteListEnabled:boolean;
}