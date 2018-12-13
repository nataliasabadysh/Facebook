//Core

import { sum, delay, getUniqueID, getFullApiUrl } from './';

describe("instrument:", ()=>{

    test( 'sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });
    test( 'sum function should throw, when called with non-number type as second argument  ', () => {
        expect(() => sum(2,'Привет') ).toThrow();
    });
    test( 'sum function should throw, when called with non-number type as first argument  ', () => {
        expect(() => sum( "Привет",2) ).toThrow();
    });
    test( 'sum function should return an addition of two arguments passed ', () => {
        expect(sum(2,3)).toBe(5);
        expect(sum(1,8)).toMatchSnapshot(9);
    });
    test( 'delay function should return an resolved promise', async () => {
        await  expect(delay()).resolves.toBeUndefined();
    });

    test( 'getUniqueID function should be a functon', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });
    test( 'getUniqueID function should throw, when called with non-number type as second argument  ', () => {
        expect(() => getUniqueID('Привет') ).toThrow();
    });
    test( 'getUniqueID function should  be produce a string of a desired given length  ', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect( getUniqueID(5) ).toHaveLength(5);
         expect( getUniqueID(13) ).toHaveLength(13);
    });

    /*
//getFullApiUrl
test( 'getFullApiUrl function should be a functon', () => {
    expect(getFullApiUrl).toBeInstanceOf(Function);
});
test( 'getFullApiUrl function should throw, when called with non-number type as second argument  ', () => {
    expect(() => getUniqueID('Привет') ).toThrow();
});
test( 'getFullApiUrl function should  be produce a string of a desired given length  ', () => {
    expect(typeof getFullApiUrl()).toBe('string');
});


export const getFullApiUrl = (api, GROUP_ID) => {
if (typeof api !== 'string' || typeof GROUP_ID !== 'string') {
    throw new Error(
        '\'api\' and \'GROUP_ID\' arguments passed should be a string!'   ,);  }
return `${api}/${GROUP_ID}`;
};
*/

});
