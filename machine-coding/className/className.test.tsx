import { describe, it, expect } from 'vitest';
import classNames from '.';

describe('classNames', () => {
    //primitive values
    it('should join string and number arguments', () => {
        expect(classNames('foo', 'bar')).toBe('foo bar');
        expect(classNames('btn', 123)).toBe('btn 123');
        expect(classNames('block', 'hidden')).toBe('block hidden');
    });

    //Conditional Objects
    it('should handle conditional class objects', () => {
        expect(classNames({ foo: true, bar: false })).toBe('foo');
        expect(classNames({ 'btn-active': true, 'btn-disabled': false })).toBe('btn-active');
        
        expect(classNames({ a: true, b: true })).toBe('a b');
    });

    //Arrays & Recursion
    it('should flatten arrays recursively', () => {
        expect(classNames(['foo', 'bar'])).toBe('foo bar');
        expect(classNames(['foo', ['bar', 'baz']])).toBe('foo bar baz');
        expect(classNames(['foo', { bar: true, baz: false }])).toBe('foo bar');
    });


    //Falsy Values
    it('should ignore falsy values', () => {
        expect(classNames(null, false, 'bar', undefined, 0)).toBe('bar');
        expect(classNames({ foo: null, bar: undefined })).toBe('');
        expect(classNames([])).toBe('');
    });

    //Mixed Arguments
    it('should handle mixed argument types', () => {
        expect(classNames(
          'foo', 
          { bar: true, duck: false }, 
          ['baz', { qux: true }]
        )).toBe('foo bar baz qux');
    });

    //computed keys
    it('should support computed keys', () => {
        const buttonType = 'primary';
        expect(classNames({ [`btn-${buttonType}`]: true })).toBe('btn-primary');
    });
})