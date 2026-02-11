import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import debounceII from '.';

describe('debounceII', () => {
    //fack timer
    beforeEach(() => {
        vi.useFakeTimers();
    });

    //After each test run, restore the time setting to prevent interference with other tests
    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it('should execute the function after the specified wait time', () => {
        const func = vi.fn();
        const debouncedFunc = debounceII(func, 1000);
    
        debouncedFunc();
    
        // When just called, it should not be executed immediately
        expect(func).not.toHaveBeenCalled();
    
        // Fast forward 500ms (not yet arrived)
        vi.advanceTimersByTime(500);
        expect(func).not.toHaveBeenCalled();
    
        // Fast forward another 500ms (it's up)
        vi.advanceTimersByTime(500);
        expect(func).toHaveBeenCalledTimes(1);
    });

    it('should debounce multiple calls (reset timer)', () => {
        const func = vi.fn();
        const debouncedFunc = debounceII(func, 1000);
    
        debouncedFunc();
        vi.advanceTimersByTime(500); // 0.5 seconds have passed
    
        debouncedFunc(); // The user clicked again. The timer should be reset
        vi.advanceTimersByTime(500); // Another 0.5 seconds passed (a total of 1.0 seconds)
        
        // This should not be executed at this point because only 0.5 seconds have passed since the second call
        expect(func).not.toHaveBeenCalled();
    
        vi.advanceTimersByTime(500); // In another 0.5 seconds (1.0 second after the second call)
        expect(func).toHaveBeenCalledTimes(1);
    });

    it('should execute with the latest arguments', () => {
        const func = vi.fn();
        const debouncedFunc = debounceII(func, 1000);
    
        debouncedFunc('first');
        debouncedFunc('second');
        debouncedFunc('last'); // we care about the last time
    
        vi.runAllTimers(); // Fast forward all the time
    
        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith('last');
    });

    //cancel()
    it('should cancel the pending execution', () => {
        const func = vi.fn();
        const debouncedFunc = debounceII(func, 1000);
    
        debouncedFunc();
        
        // cancel
        debouncedFunc.cancel();
    
        vi.runAllTimers();
    
        // it should not be execute even once since cancelled
        expect(func).not.toHaveBeenCalled();
    });

    // flush()
  it('should immediately execute the pending function (flush)', () => {
        const func = vi.fn();
        const debouncedFunc = debounceII(func, 1000);

        debouncedFunc('urgent');

        //No more waiting. Just Flush directly
        debouncedFunc.flush();

        // 1. should execute immediately
        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith('urgent');

        // 2. should not Double Dip Check
        vi.runAllTimers();
        expect(func).toHaveBeenCalledTimes(1); 
    });

    it('should not flush if there is no pending invocation', () => {
        const func = vi.fn();
        const debouncedFunc = debounceII(func, 1000);
    
        // have not call debouncedFunc，use flush
        debouncedFunc.flush();
    
        expect(func).not.toHaveBeenCalled();
    });


    it('should preserve "this" context', () => {
        const func = vi.fn();
        const debouncedFunc = debounceII(func, 1000);
    
        const context = { value: 42 };
        
        debouncedFunc.call(context);
    
        vi.runAllTimers();

        expect(func.mock.instances[0]).toBe(context);
    });

})