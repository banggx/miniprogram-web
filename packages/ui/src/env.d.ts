interface IMessage {
  type: string;
  body: any;
}

interface Window {
  JSBridge: {
    onReceiveNativeMessage: (message: IMessage) => void;
    onReceiveUIMessage: (message: IMessage) => void;
  };
  Page: any;
  Vue: any;
  modRequire: any;
  modDefine: any;
  wxComponentsApi: any;
}
