export default interface Usecase {
  execute(input?: any): any | Promise<any>;
}
