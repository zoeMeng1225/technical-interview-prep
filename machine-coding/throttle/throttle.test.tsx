import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import throttle from '.';

describe('throttle', () => {
    //enable fake timers
    beforeEach(() => {
        vi.useFakeTimers()
    });

    //restore real timers after tests to avoid affecting other tests
    afterEach(() => {
        vi.useRealTimers()
    });

    it('should execute immediately on the first call(Landing Edge)', () => {
        const func = vi.fn() //create a spy function
        const throttledFunc = throttle(func, 1000);

        throttledFunc(); // first invocation
        expect(func).toHaveBeenCalledTimes(1); //should execute immediately
    });
    
    it('should ignore calls during the cooldown period', () => {
        const func = vi.fn();
        const throttledFunc = throttle(func, 1000);

        throttledFunc(); //T=0: executed(1st time)

        //fast-forward 500ms(still within cooldown)
        vi.advanceTimersByTime(500);
        throttledFunc(); //T=500: should be ignored;
        // Fast-forward 400ms (total 900ms, still within cooldown)

        vi.advanceTimersByTime(400); 
        throttledFunc(); // T=900: Should be ignored
        
        //verify:only called once in total
        expect(func).toHaveBeenCalledTimes(1)
    });

    it('should ignore calls during the cooldown period', () => {
        const func = vi.fn();
        const throttledFunc = throttle(func, 1000);

        throttledFunc(); //T=0: executed(1st time)

        vi.advanceTimersByTime(1000);

        throttledFunc(); // T=1000: Should execute again
        
        expect(func).toHaveBeenCalledTimes(2);
        
    });
})