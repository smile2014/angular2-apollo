import { NgModule, ModuleWithProviders } from '@angular/core';

import { Angular2Apollo, defaultApolloClient } from './Angular2Apollo';
import { ApolloQueryPipe } from './ApolloQueryPipe';
import { SelectPipe } from './SelectPipe';

import ApolloClient from 'apollo-client';

const APOLLO_DIRECTIVES = [
  ApolloQueryPipe,
  SelectPipe,
];
const APOLLO_PROVIDERS = [
  Angular2Apollo,
];

@NgModule({
  declarations: APOLLO_DIRECTIVES,
  exports: APOLLO_DIRECTIVES,
})
export class ApolloModule {
  /**
   * @deprecated
   */
  public static withClient(client: ApolloClient): ModuleWithProviders {
    return {
      ngModule: ApolloModule,
      providers: [
        APOLLO_PROVIDERS,
        defaultApolloClient(client),
      ],
    };
  }

  public static forRoot(client: ApolloClient): ModuleWithProviders {
    return ApolloModule.withClient(client);
  }

  public static forChild(client: ApolloClient): ModuleWithProviders {
    return {
      ngModule: ApolloModule,
      providers: [
        defaultApolloClient(client),
      ],
    };
  }
}
