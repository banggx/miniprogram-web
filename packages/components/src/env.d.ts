declare module '*.html' {
  const content: string;
  export default content;
}

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
  wxComponentsApi: any;
}