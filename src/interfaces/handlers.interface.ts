export interface Handlers {
  [key: string]: (event: any, context: any) => Promise<any>;
}
