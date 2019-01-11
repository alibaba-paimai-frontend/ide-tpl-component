import { types, destroy, IAnyModelType, Instance } from 'mobx-state-tree';
import { debugModel } from '../../lib/debug';
import { invariant, capitalize } from '../../lib/util';
import { I[CLASSNAME]Props, I[CLASSNAME]Model, [CLASSNAME]Model, IStoresModel } from '../../index';

/**
 * 将普通对象转换成 Model
 * @param modelObject - 普通的对象
 */
export function createModel(modelObject: I[CLASSNAME]Props): I[CLASSNAME]Model {
  invariant(!!modelObject, 'modelObject 对象不能为空');

  const model = [CLASSNAME]Model.create({
    visible: modelObject.visible,
    text: modelObject.text,
  });


  return model;
}

/**
 * 创建新的空白
 */
export function createEmptyModel() {
  return createModel({});
}

/* ----------------------------------------------------
    更新指定 enum 中的属性
----------------------------------------------------- */
const update = (valueSet: string[]) => (
  item: I[CLASSNAME]Model | IStoresModel,
  attrName: string,
  value: any
): boolean => {
  invariant(!!item, '入参 item 必须存在');
  // 如果不是可更新的属性，那么将返回 false
  if (!valueSet.includes(attrName)) {
    debugModel(
      `[更新属性] 属性名 ${attrName} 不属于可更新范围，无法更新成 ${value} 值；（附:可更新属性列表：${valueSet}）`
    );
    return false;
  }

  const functionName = `set${capitalize(attrName)}`; // 比如 attrName 是 `type`, 则调用 `setType` 方法
  (item as any)[functionName](value);
  return true;
};

// 定义 menu 可更新信息的属性
const EDITABLE_ATTRIBUTE = [
  'visible',
  'text'
];

export const updateModelAttribute = update(EDITABLE_ATTRIBUTE);
