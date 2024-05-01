import {sentimentTranslator} from '../src/client/js/formHandler'

describe('Test for sentimentTranslator function',() => {
    test('test sentimentTranslator function for P+', () => {
        expect(sentimentTranslator('P+')).toBe('Strong positive');
    })
    test('test sentimentTranslator function for P', () => {
        expect(sentimentTranslator('P')).toBe('Positive');
    })
    test('test sentimentTranslator function for NEU', () => {
        expect(sentimentTranslator('NEU')).toBe('Neutral');
    })
    test('test sentimentTranslator function for N', () => {
        expect(sentimentTranslator('N')).toBe('Negative');
    })
    test('test sentimentTranslator function for N+', () => {
        expect(sentimentTranslator('N+')).toBe('Strong negative');
    })
    test('test sentimentTranslator function for NONE', () => {
        expect(sentimentTranslator('NONE')).toBe('No sentiment');
    })
});