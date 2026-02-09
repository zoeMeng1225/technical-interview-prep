import {describe, it, expect, vi, beforeEach} from 'vitest';
import EventEmitter from '.';

describe('EventEmitter', () => {
    let emitter: EventEmitter;

    beforeEach(() => {
        emitter = new EventEmitter()
    })

    it('should allow subscribing to events and emitting them', () => {
        const callback = vi.fn();
        emitter.on('test', callback);
        emitter.emit('test');

        expect(callback).toHaveBeenCalledTimes(1);
    })

    it('should pass arguments to the listeners', () => {
        const callback = vi.fn();
    
        emitter.on('greet', callback);
        emitter.emit('greet', 'Hello', 'World');
    
        expect(callback).toHaveBeenCalledWith('Hello', 'World');
    });

    it('should support multiple listeners for the same event', () => {
        const callback1 = vi.fn();
        const callback2 = vi.fn();
    
        emitter.on('click', callback1);
        emitter.on('click', callback2);
    
        emitter.emit('click');
    
        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledTimes(1);
    });

    it('should allow method chaining for "on"', () => {
        const callback1 = vi.fn();
        const callback2 = vi.fn();
    
        emitter
          .on('foo', callback1)
          .on('bar', callback2);
    
        emitter.emit('foo');
        emitter.emit('bar');
    
        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledTimes(1);
    });

    it('should allow removing listeners with "off"', () => {
        const callback = vi.fn();
    
        emitter.on('test', callback);
        emitter.off('test', callback);
        emitter.emit('test');
    
        expect(callback).not.toHaveBeenCalled();
    });

    it('should allow method chaining for "off"', () => {
        const callback = vi.fn();
    
     
        emitter
          .on('test', callback)
          .off('test', callback)
          .on('other', callback); 
    
        emitter.emit('test');
        expect(callback).not.toHaveBeenCalled();
    });

    it('should return true if listeners were called, false otherwise', () => {
        const callback = vi.fn();
    
        // No listeners
        const result1 = emitter.emit('empty');
        expect(result1).toBe(false);
    
        // With listeners
        emitter.on('filled', callback);
        const result2 = emitter.emit('filled');
        expect(result2).toBe(true);
      });
    
      it('should handle removing a listener that was never added', () => {
        const callback = vi.fn();

        // should not error, support for chain call
        expect(() => {
          emitter.off('non-existent', callback);
        }).not.toThrow();
        
       
        const result = emitter.off('non-existent', callback);
        expect(result).toBe(emitter);
      }); 
})