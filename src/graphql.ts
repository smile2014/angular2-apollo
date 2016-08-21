import { Angular2Apollo } from './Angular2Apollo';
import { Apollo } from './ApolloDecorator';
import { ApolloClientRef } from './utils/ApolloClientRef';
import replaceConstructor from './utils/replaceConstructor';

export default function graphql({queries, mutations}) {
  return function graphqlDecorator(target) {
    const injects = Reflect['getMetadata']('design:paramtypes', target);

    const client = new ApolloClientRef();

    const wrapper = replaceConstructor(target, function(apollo, ...args) {
      // assign Angular2Apollo
      Object.defineProperty(this, '__apollo', {
        value: apollo,
        enumerable: true,
        configurable: true,
      });

      client.setRef(apollo.client);

      // assign query
      target.apply(this, args);
    });

    Reflect['defineMetadata']('design:paramtypes', [Angular2Apollo, ...injects], wrapper);

    return Apollo({client, queries, mutations})(wrapper);
  }
};
