import { describe, it, expect, vi } from 'vitest';
import debounce from ".";

describe('debounce', () => {
    it('should execute only once after the wait time', () => {
        vi.useFakeTimers(); //fack timer

        const func = vi.fn();//mock funtion
        const debouncedFunc = debounce(func, 1000);

        debouncedFunc('a')
        debouncedFunc('b');
        debouncedFunc('c');

        //fast forward time by 500ms
        vi.advanceTimersByTime(500);
        //it should not be executed at this point
        expect(func).not.toHaveBeenCalled();

        //fast forward time by 500ms again(total 1000ms)
        vi.advanceTimersByTime(500);

        //It should have only been called once, and the parameter was the last passed 'c'.
        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith('c');

        //back to real time
        vi.useRealTimers()

    })
})