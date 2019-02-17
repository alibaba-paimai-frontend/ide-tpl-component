import { cast, types, Instance, SnapshotOrInstance } from 'mobx-state-tree';

import { createEmptyModel } from './util';
import { [CLASSNAME]Model } from './index';

export const STORE_ID_PREIX = '[IDPREFIX]_';


// 获取被 store 控制的 key 的列表
export type TStoresControlledKeys =
  Exclude<keyof SnapshotOrInstance<typeof Stores>, 'id'>;

export const STORES_CONTROLLED_KEYS: string[] = [
  'model'
];

export const Stores = types
  .model('StoresModel', {
    id: types.refinement(
      types.identifier,
      identifier => identifier.indexOf(STORE_ID_PREIX) === 0
    ),
    model: [CLASSNAME]Model
  })
  .actions(self => {
    return {
      setModel(model: SnapshotOrInstance<typeof self.model>) {
        self.model = cast(model);
      },
      resetToEmpty() {
        self.model = createEmptyModel();
      }
    };
  });

export interface IStoresModel extends Instance<typeof Stores> {}

let autoId = 1;
/**
 * 工厂方法，用于创建 stores
 */
export function StoresFactory() {
  // const {
  //   app: codeEditorApp,
  //   client: codeEditorClient,
  //   stores: codeEditorStores
  // } = CodeEditorFactory();
  const stores = Stores.create({
    id: `${STORE_ID_PREIX}${autoId++}`,
    model: createEmptyModel() as any
  }
  // ,
  //   {
  //     codeEditorClient
  //   }
  );

  return {
    stores,
    innerApps: {
      // codeEditor: codeEditorApp
    }
  }
}
