import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';

import { debugInteract, debugRender } from '../lib/debug';
import { StyledContainer } from './styles';
import { AppFactory } from './controller/index';
import { I[CLASSNAME]Model } from './schema';
import { StoresFactory, IStoresModel } from './schema/stores';

export interface I[CLASSNAME]Event {
  /**
   * 点击回调函数
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface I[CLASSNAME]Props extends I[CLASSNAME]Event {
  /**
   * 是否展现
   */
  visible?: boolean;

  /**
   * 文案
   */
  text?: string;
}

// 推荐使用 decorator 的方式，否则 stories 的导出会缺少 **Prop Types** 的说明
// 因为 react-docgen-typescript-loader 需要  named export 导出方式
@observer
export class [CLASSNAME] extends Component<I[CLASSNAME]Props> {
  // private root: React.RefObject<HTMLDivElement>;
  constructor(props: I[CLASSNAME]Props) {
    super(props);
    this.state = {};
    // this.root = React.createRef();
  }
  onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onClick } = this.props;
    onClick && onClick(e);
  };
  render() {
    const { visible, text } = this.props;
    return (
      <StyledContainer
        visible={visible}
        // ref={this.root}
        className="[NAME]-container"
      >
        <Button onClick={this.onClick}>
          {text || '点我试试'}
        </Button>
      </StyledContainer>
    );
  }
}

/* ----------------------------------------------------
    以下是专门配合 store 时的组件版本
----------------------------------------------------- */

const onClickWithStore = (
  stores: IStoresModel,
  onClick: React.MouseEventHandler<HTMLButtonElement>
) => (e: React.MouseEvent<HTMLButtonElement>) => {
  // stores.setValue(newValue);
  onClick && onClick(e);
};
/**
 * 科里化创建 [CLASSNAME]WithStore 组件
 * @param stores - store 模型实例
 */
export const [CLASSNAME]AddStore = (stores: IStoresModel) =>
  observer(function [CLASSNAME]WithStore(props: I[CLASSNAME]Props) {
    const { onClick, visible, ...otherPops } = props;
    const { model } = stores;
    debugRender(`[${stores.id}] rendering`);
    return (
      <[CLASSNAME]
        visible={model.visible}
        text={model.text}
        onClick={onClickWithStore(stores, onClick)}
        {...otherPops}
      />
    );
  });
/**
 * 工厂函数，每调用一次就获取一副 MVC
 * 用于隔离不同的 [CLASSNAME]WithStore 的上下文
 */
export const [CLASSNAME]Factory = () => {
  const stores = StoresFactory(); // 创建 model
  const app = AppFactory(stores); // 创建 controller，并挂载 model
  return {
    stores,
    app,
    client: app.client,
    [CLASSNAME]WithStore: [CLASSNAME]AddStore(stores)
  };
};