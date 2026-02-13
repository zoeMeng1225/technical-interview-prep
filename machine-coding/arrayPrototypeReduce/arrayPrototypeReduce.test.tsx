// machine-coding/arrayPrototypeReduce/arrayPrototypeReduce.test.tsx
import {describe, it, expect, vi} from 'vitest';
import './index'



  
  describe('Array.prototype.myReduce', () => {

    it('should sum an array of numbers without initial value', () => {
      const nums = [1, 2, 3];
      const result = nums.myReduce((acc:number, curr) => acc + curr);
      expect(result).toBe(6);
    });
  
    it('should sum an array of numbers WITH initial value', () => {
      const nums = [1, 2, 3];
      const result = nums.myReduce((acc, curr) => acc + curr, 10);
      expect(result).toBe(16); // 10 + 1 + 2 + 3
    });
  

    it('should accumulate strings', () => {
      const chars = ['h', 'e', 'l', 'l', 'o'];
      const result = chars.myReduce((acc, curr) => acc + curr, '');
      expect(result).toBe('hello');
    });
  

    it('should skip empty slots (sparse arrays)', () => {
  
      const sparseArr = [1, 2, , 3];
      
 
      const result = sparseArr.myReduce((acc: any, curr: any) => acc + curr);
      
      expect(result).toBe(6);
    });
  
 
    it('should handle array of objects', () => {
      const items = [{ x: 1 }, { x: 2 }, { x: 3 }];
      const result = items.myReduce((acc: any, curr: any) => acc + curr.x, 0);
      expect(result).toBe(6);
    });
  

    it('should return initial value for empty array', () => {
      const emptyArr: number[] = [];
      const result = emptyArr.myReduce((acc, curr) => acc + curr, 100);
      expect(result).toBe(100);
    });
  

    it('should throw TypeError for empty array with no initial value', () => {
      const emptyArr: number[] = [];
      expect(() => {
        emptyArr.myReduce((acc: number, curr) => acc + curr);
      }).toThrow(TypeError);
    });

  

    it('should pass correct index and array to callback', () => {
      const arr = ['a', 'b'];
      const mockCallback = vi.fn((acc, curr, idx, array) => acc + curr);
      
      arr.myReduce(mockCallback, '');
      
      // first call: idx should be 0, array should be arr
      expect(mockCallback).toHaveBeenCalledWith('', 'a', 0, arr);
      // second call: idx should be 1
      expect(mockCallback).toHaveBeenCalledWith('a', 'b', 1, arr);
    });
  });