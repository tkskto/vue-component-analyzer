/**
 * イベント発光時に引数として渡されるEventクラス
 */
export class MyCustomEvent {
  public currentTarget: CustomEventDispatcher | null = null; // eslint-disable-line

  static COMPLETE = 'complete';

  static CHANGE_PROPERTY = 'changeProperty';

  constructor(public type: string) {} // eslint-disable-line
}

/**
 * イベントリスナークラス
 */
export class CustomEventListener {
  /**
   *
   * @param type
   * @param handler
   * @param priority
   */
  constructor(public type: string, public handler: (e: MyCustomEvent) => void, public priority: number = 0) {} // eslint-disable-line

  /**
   * タイプとコールバックからリスナーを比較する
   * @param type
   * @param handler
   * @returns {boolean}
   */
  equalCurrentListener(type: string, handler: (e: MyCustomEvent) => void): boolean {
    return this.type === type && this.handler === handler;
  }
}

/**
 * dispatcherとなるクラスでextendして使う
 */
export class CustomEventDispatcher {
  listeners: {[key:string]: CustomEventListener[]} = {};

  /**
   * イベントを発光するメソッド
   * @param event
   */
  dispatchEvent(event: string | MyCustomEvent): void {
    let e: MyCustomEvent;
    let type: string;

    // 引数がEventオブジェクトだった場合
    if (event instanceof MyCustomEvent) {
      type = event.type; // eslint-disable-line
      e = event;

      // 引数がstringだった場合
    } else {
      type = event;
      e = new MyCustomEvent(type);
    }

    if (this.listeners[type] !== null) {
      const len: number = this.listeners[type].length;
      e.currentTarget = this;

      for (let i = 0; i < len; i++) {
        const listener: CustomEventListener = this.listeners[type][i];
        try {
          listener.handler(e);
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.stack);
          }
        }
      }
    } else {
      console.warn('implement "addEventListener" before dispatch');
    }
  }

  /**
   * typeにひもづいたリスナーを登録する
   * @param type
   * @param callback
   * @param priority
   */
  addEventListener(type: string, callback: (e: MyCustomEvent) => void, priority = 0): void {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    this.listeners[type].push(new CustomEventListener(type, callback, priority));
    this.listeners[type].sort((listener1: CustomEventListener, listener2: CustomEventListener) => listener2.priority - listener1.priority);
  }

  /**
   * typeにひもづいたリスナーを削除する
   * @param type
   * @param callback
   */
  removeEventListener(type: string, callback: (e: MyCustomEvent) => void): void {
    if (this.hasEventListener(type, callback)) {
      for (let i = 0; i < this.listeners[type].length; i++) {
        const listener: CustomEventListener = this.listeners[type][i];
        if (listener.equalCurrentListener(type, callback)) {
          this.listeners[type].splice(i, 1);

          return;
        }
      }
    }
  }

  /**
   * このインスタンスにひもづいている全てのリスナーを解除する
   */
  clearEventListener(): void {
    this.listeners = {};
  }

  /**
   * インスタンスに指定タイプのリスナーがあるかどうかをチェックする
   * @param type
   * @returns {boolean}
   */
  containEventListener(type: string): boolean {
    if (!this.listeners[type]) {
      return false;
    }

    return this.listeners[type].length > 0;
  }

  /**
   * インスタンスに指定タイプかつ、指定のコールバックのリスナーがあるかどうかをチェックする
   * @param type
   * @param callback
   * @returns {boolean}
   */
  hasEventListener(type: string, callback: (e: MyCustomEvent) => void): boolean {
    if (!this.listeners[type]) {
      return false;
    }

    for (let i = 0; i < this.listeners[type].length; i++) {
      const listener: CustomEventListener = this.listeners[type][i];
      if (listener.equalCurrentListener(type, callback)) {
        return true;
      }
    }

    return false;
  }
}
