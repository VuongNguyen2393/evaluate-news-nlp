import {isValidUrl} from "../src/client/js/urlChecker"

describe('Test isValidUrl function', () => {

    test('test string udacity is not a url', () => {
        expect(isValidUrl('udacity')).toBe(false);
    });

    test('test string udacity.com is not a url', () => {
        expect(isValidUrl('udacity.com')).toBe(false);
    });
    
    test('test string www.udacity.com is not a url', () => {
        expect(isValidUrl('www.udacity.com')).toBe(false);
    });
    
    test('test string https://www.udacity.com/ is a url', () => {
        expect(isValidUrl('https://www.udacity.com/')).toBe(true);
    });
});
