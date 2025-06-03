/**
 * logger: undo redo
 */

const MAX_LOG_SIZE = 100;

interface LoggerProps {
  maxSize?: number;
}

class Logger {
  private record: string[] = [];

  private recycle: string[] = [];

  private maxSize: number;

  initValue: string = '';

  constructor(props: LoggerProps = {}) {
    const { maxSize = MAX_LOG_SIZE } = props;
    this.maxSize = maxSize;
  }

  push(val: string) {
    const result = this.record.push(val);
    // If the maximum limit is exceeded, clear the previous ones to avoid wasting memory.

    while (this.record.length > this.maxSize) {
      this.record.shift();
    }
    return result;
  }

  get() {
    return this.record;
  }

  getLast(): string {
    const { length } = this.record;
    return this.record[length - 1]!;
  }

  undo(skipText?: string) {
    const current = this.record.pop();
    if (typeof current === 'undefined') {
      return this.initValue;
    }
    // If the top one is different from the current one, then there is no need to pop it again
    if (current !== skipText) {
      this.recycle.push(current);
      return current;
    }
    // Otherwise, the top one is the current state, so you have to pop twice to get the previous result.

    const last = this.record.pop();
    if (typeof last === 'undefined') {
      //There are no older records. Give the initial value.

      this.recycle.push(current);
      return this.initValue;
    }
    // last That's the real next step
    this.recycle.push(current);
    return last;
  }

  redo() {
    const history = this.recycle.pop();
    if (typeof history !== 'undefined') {
      this.push(history);
      return history;
    }
    return undefined;
  }

  cleanRedo() {
    this.recycle = [];
  }

  getUndoCount() {
    return this.undo.length;
  }

  getRedoCount() {
    return this.recycle.length;
  }
}

export default Logger;
