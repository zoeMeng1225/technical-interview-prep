import { describe, it, expect } from "vitest";
import {isArray, isFunction, isObject, isPlainObject} from '.';

describe('Type Utilities II', () => {
    describe('isArray', () => {
        it('should return true for array', () => {
            expect(isArray([])).toBe(true);
            expect(isArray([1,2,3])).toBe(true);
            expect(isArray([new Array(3)])).toBe(true);
        })

        it('should return false for non-arrays',() => {
            expect(isArray({})).toBe(false);
            expect(isArray('string')).toBe(false);
            expect(isArray(null)).toBe(false);
        })
    });

    describe('isFunction', () => {
        it('should return true for functions', () => {
            expect(isFunction(() => {})).toBe(true);
            expect(isFunction(function(){})).toBe(true);
            expect(isFunction(class C {})).toBe(true);
        });

        it('should return false for non-function', () => {
            expect(isFunction({})).toBe(false);
            expect(isFunction(/regex/)).toBe(false); //in older browsers, regex might be function
        })
    });

    describe('isObject', () => {
        it('should return true for object, array and functions', () => {
            expect(isObject({})).toBe(true);
            expect(isObject([])).toBe(true);
            expect(isObject(()=>{})).toBe(true);
            expect(isObject(/regex/)).toBe(true);
            expect(isObject(new Date())).toBe(true);
        });

        it('should return false for primitives and null', () => {
            expect(isObject(null)).toBe(false);
            expect(isObject(undefined)).toBe(false);
            expect(isObject(123)).toBe(false);
            expect(isObject('string')).toBe(false);
            expect(isObject(true)).toBe(false);
        })
    });

    describe('isPlainObject', () => {
        it('should return true for plain objects', () => {
            expect(isPlainObject({})).toBe(true);
            expect(isPlainObject({a: 1})).toBe(true);
            expect(isPlainObject(Object.create(null))).toBe(true);
            expect(isPlainObject(new Object())).toBe(true);
        });

        it('should return false for non-plain objects', () => {
            expect(isPlainObject([])).toBe(false); //Array isn't plain object
            expect(isPlainObject(new Date())).toBe(false);
            expect(isPlainObject(null)).toBe(false);
            
            class Myclass{}
            expect(isPlainObject(new Myclass())).toBe(false)
        })
    })
})