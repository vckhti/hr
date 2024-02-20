import {StoreDevtoolsModule} from "@ngrx/store-devtools";

export const environment = {
  production: true,
  serverUrl: 'http://msk-test-prebilling-onyma.rtcomm.ru:8082',
  //serverUrl: 'http://rt-onyma-prebilling1.rtcomm.ru:8082',
  modules: [
    StoreDevtoolsModule.instrument({
      name: 'predbilling',
      logOnly: true
    }),
  ]
};
