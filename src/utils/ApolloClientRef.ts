import ApolloClient from 'apollo-client';

export class ApolloClientRef {
  private _ref: ApolloClient;

  public setRef(ref: ApolloClient) {
    this._ref = ref;
  }

  public getRef(): ApolloClient {
    return this._ref;
  }
}
