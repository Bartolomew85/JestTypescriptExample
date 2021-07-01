import { subfunction } from './sub';
import { sumfunction } from './sum';
import Memory from './memory';

type Op = 'MemoryAdd' | 'MemoryClear' | 'MemorySub' | 'Sub' | 'Sum';

export default (memory: Memory) => {
  let last = 0;

  return (op: Op, input: Array<number>): number => {
    switch (op) {
      case 'MemoryAdd': {
        return memory.add(last);
      }
      case 'MemoryClear': {
        memory.reset();
        return last;
      }
      case 'MemorySub': {
        return memory.subtract(last);
      }
      case 'Sub': {
        const [a, b] = input;
        const result = subfunction.sub(a, b);
        last = result;
        return result;
      }
      case 'Sum': {
        const [a, b] = input;
        const result = sumfunction.sum(a, b);
        last = result;
        return result;
      }
      default: {
        throw new Error('Invalid op');
      }
    }
  };
};
