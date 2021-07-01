import Memory from './memory';
import { subfunction } from './sub';
import { sumfunction } from './sum';
import makeCalc from './calc';

describe('calc - mocks', () => {
  var mockSub, mockSum;
  const memory = new Memory();

  beforeEach(function(){
    mockSub = spyOn(subfunction, 'sub').and.callThrough();
    mockSum = spyOn(sumfunction, 'sum').and.callThrough();
  });

  it('returns result from subtract', () => {
    mockSub.and.returnValue(0);

    const calc = makeCalc(memory);
    const result = calc('Sub', [2, 2]);

    expect(result).toEqual(0);
    expect(mockSub).toHaveBeenCalledWith(2, 2);
  });

  it('returns result from sum', () => {
    mockSum.and.returnValue(2);

    const calc = makeCalc(memory);
    const result = calc('Sum', [1, 1]);

    expect(result).toEqual(2);
    expect(mockSum).toHaveBeenCalledWith(1, 1);
  });

  it('adds last result to memory', () => {
    const MockMemoryAdd = spyOn(Memory.prototype, 'add').and.callFake(x => x);
    mockSum.and.returnValue(2);

    const calc = makeCalc(memory);
    const sumResult = calc('Sum', [1, 1]);
    const memoryResult = calc('MemoryAdd', []);

    expect(sumResult).toEqual(2);
    expect(memoryResult).toEqual(2);
    expect(MockMemoryAdd).toHaveBeenCalledWith(2);
  });

  it('adds last result to memory #2', () => {
    const MockMemoryAdd = spyOn(Memory.prototype, 'add').and.callFake((x) => { 
      expect(x).toBe(2);
      return x;
    });
    mockSum.and.returnValue(2);

    const calc = makeCalc(memory);
    const sumResult = calc('Sum', [1, 1]);
    const memoryResult = calc('MemoryAdd', []);

    expect(sumResult).toEqual(2);
    expect(memoryResult).toEqual(2);
    expect(MockMemoryAdd).toHaveBeenCalledWith(2);
  });

  it('subtracts last result to memory', () => {
    const MockMemorySubtract = spyOn(Memory.prototype, 'subtract').and.callFake(x => x);
    mockSum.and.returnValue(2);

    const calc = makeCalc(memory);
    const sumResult = calc('Sum', [1, 1]);
    const memoryResult = calc('MemorySub', []);

    expect(sumResult).toEqual(2);
    expect(memoryResult).toEqual(2);
    expect(Memory.prototype.subtract).toHaveBeenCalledWith(2);
  });

  it('clears the memory', () => {
    const MockMemoryAdd = spyOn(Memory.prototype, 'add').and.callFake(x => x);
    const MockMemoryReset = spyOn(Memory.prototype, 'reset').and.callThrough();
    mockSum.and.returnValue(2);

    const calc = makeCalc(memory);
    const sumResult = calc('Sum', [1, 1]);
    const memoryResult = calc('MemoryAdd', []);

    mockSum.and.returnValue(4);
    const sumResult2 = calc('Sum', [2, 2]);
    const clearResult = calc('MemoryClear', []);

    expect(sumResult).toEqual(2);
    expect(memoryResult).toEqual(2);
    expect(sumResult2).toEqual(4);
    expect(clearResult).toEqual(4);
    expect(Memory.prototype.reset).toHaveBeenCalledTimes(1);
  });

  it('throws an error when invalid Op is passed', () => {
    const calc = makeCalc(memory);

    // @ts-expect-error
    expect(() => calc('Multiply', [2, 3])).toThrowError('Invalid op');
  });
});
