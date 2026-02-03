import {describe, it, expect} from 'vitest'
import classNames from '.'

describe('classNamesII', () => {
    it('should join arguments with space', () => {
        expect(classNames('foo', 'bar')).toBe('foo bar');
        expect(classNames('foo', 'bar', 'baz')).toBe('foo bar baz');
    });

    it('should handle numbers', () => {
        expect(classNames('foo', 123)).toBe('foo 123');
    });

    it('should ignore falsy value(null, undefined, false, 0)', () => {
        expect(classNames('foo', null, undefined, false, 'bar')).toBe('foo bar');
    });

    //Dedepulication
    it('should dedupulicate classes', () => {
        expect(classNames('foo', 'foo', 'bar')).toBe('foo bar');
        expect(classNames('foo', {foo: true})).toBe('foo');
    });

    //For Object
    it('should conditionlly add classes based on object keys', () => {
        expect(classNames({foo: true, bar: false, baz: true})).toBe('foo baz');
    });

    it('should remove a class if an object key map to false', () => {
        expect(classNames('foo', 'bar', {foo: false})).toBe('bar');
    });

    //recursive array
    it('should excute function and process their return values', () => {
        const getActive = () => 'active';
        expect(classNames(getActive)).toBe('active')

        //function return array
        const getList = () => ['item', 'item-id'];
        expect(classNames(getList)).toBe('item item-id')
    });

    //intergration test
    it('should handle complex mixed arguments', () => {
        expect(classNames('foo', {bar: true, foo: false}, ['baz', {qux: true}])).toBe('bar baz qux')
    })

})