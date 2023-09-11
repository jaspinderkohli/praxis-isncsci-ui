import {IExternalMessageProvider} from '@core/boundaries';

export class ExternalMessagePortProviderActions {
  public static INITIALIZE_PORT: string = 'INITIALIZE_PORT';
  public static SET_EXAM_DATA: string = 'SET_EXAM_DATA';
  public static ON_EXAM_DATA: string = 'ON_EXAM_DATA';
  public static ON_EXTERNAL_PORT: string = 'ON_EXTERNAL_PORT';
}

export class ExternalMessagePortProvider implements IExternalMessageProvider {
  private handlers: Array<(actionType: string, examData: {[key: string]: string} | null) => void> = [];
  private port: MessagePort | null = null;

  constructor() {
    // Listen for the initial port transfer message
    window.addEventListener('message', (e) => this.initPort(e));
  }

  private initPort(e: MessageEvent) {
    if (e.data.action && e.data.action === ExternalMessagePortProviderActions.INITIALIZE_PORT) {
      this.port = e.ports[0] ?? null;
      this.port.onmessage = (e: MessageEvent) => this.onPortMessage(e.data.action, e.data.examData);
      this.dispatch({examData: null, type: ExternalMessagePortProviderActions.ON_EXTERNAL_PORT});
    }
  }

  private onPortMessage(action: string, examData: {[key: string]: string} | null) {
    if (action === ExternalMessagePortProviderActions.SET_EXAM_DATA) {
      this.dispatch({examData, type: ExternalMessagePortProviderActions.ON_EXAM_DATA});
    }
  }

  public sendOutExamData() {
    console.log('sendExamDataThroughExternalChannel');
    this.port?.postMessage('message from outside iframe');
  }

  private dispatch(action: {type: string; examData: {[key: string]: string} | null;}) {
    this.handlers.forEach((handler) => handler(action.type, action.examData));
  }

  /*
   * returns the unsubscribe function
   */
  public subscribe(handler: (action: string, examData: {[key: string]: string} | null) => void) {
    this.handlers.push(handler);

    return () => {
      const index: number = this.handlers.findIndex((value: Function) => value === handler);
      if (index > -1) { this.handlers.splice(index, 1); }
    };
  }
}
