import { isEventObjFront } from '../util/validation/isEventObjFront';
import { isIDPattern } from '../util/validation/isIDPattern';
import { isPWPattern } from '../util/validation/isPWPattern';
import { isNumber } from '../util/validation/isNumber';
import { isString } from '../util/validation/isString';
describe('isEventObjFront function', () => {
    test('잘못 된 값을 줄 때 에러를 제대로 보여주는지 확인', () => {
        const state = {
            title : 'Event 1',
            start : 'Plan 1',
            end : '2023-07-16',
            state : true
        };

        expect(() => {
            isEventObjFront(state);
        }).toThrowError('[ERROR] extendedProps의 자료형이 잘못되었습니다.');
    });

    test('[Type 1] 시간값을 잘못 줬을 때 에러를 제대로 보여주는지 확인', () => {
       const state = {
           title: 'Event 1',
           extendedProps : {
               eventContent : "test"
           },
           start : "2023.03.12",
           end : "2023-06-12",
           constraint : {
               startTime : "03:12",
               endTime : "03:12"
           },
           state: true
       };

        expect(() => {
            isEventObjFront(state);
        }).toThrowError('[ERROR] start의 형식이 올바르지 않습니다. (올바른 형식: YYYY-MM-DD)');
    });

    test('[Type 2] 시간값을 잘못 줬을 때 에러를 제대로 보여주는지 확인', () => {
        const state = {
            title: 'Event 1',
            extendedProps : {
                eventContent : "test"
            },
            start : "2023-03-12",
            end : "2023-06-12",
            constraint : {
                startTime : "03-12",
                endTime : "03:12"
            },
            state: true
        };

        expect(() => {
            isEventObjFront(state);
        }).toThrowError('[ERROR] constraint의 startTime의 형식이 올바르지 않습니다. (올바른 형식: hh:mm)');
    });

    test('값안의 잘못 된 값을 줄 때 에러를 제대로 보여주는지 확인', () => {
        const state = {
            title: 'Event 1',
            extendedProps : {
                eventContent : "test"
            },
            start : "2023-04-21",
            end : "2023-06-12",
            constraint : {
              startTime : [1,2,3,4],
              endTime : "03:12"
            },
            state: true
        };

        expect(() => {
            isEventObjFront(state);
        }).toThrowError(`[ERROR] constraint의 startTime 값의 자료형이 잘못되었습니다.`);
    });

    test('제대로 된 값을 줄 경우 작동하는지 확인', () => {
        const state = {
            title: 'Event 1',
            extendedProps : {
                eventContent : "test"
            },
            start : "2023-04-21",
            end : "2023-06-12",
            constraint : {
                startTime : "03:11",
                endTime : "03:12"
            },
            state: true
        };
        expect(isEventObjFront(state)).toEqual(state);
    });
});

describe('isIDPattern function', () => {
    test('아이디 형식에 맞지 않을 경우 에러를 표시하는지 확인', () => {
        const id = "qwer_1234힣";
        expect(isIDPattern(id)).toBeFalsy();
    });

    test('아이디 형식에 맞을 경우 에러를 표시하는지 확인', () => {
        const id = "qwer1234";
        expect(isIDPattern(id)).toEqual(id);
    })
});

describe('isPWPattern function', () => {
    test('패스워드의 형식에 맞지 않을 경우 에러를 표시하는지 확인', () => {
        const pw = "123힣_123";
        expect(isPWPattern(pw)).toBeFalsy();
    });

    test('패스워드의 특수문자를 확인하는 테스트', () => {
        const pw = "_2q"; //_
        expect(isPWPattern(pw)).toBeFalsy();
    });

    test('패스워드의 형식에 맞을 경우 잘 반환하는지 확인', () => {
        const pw = "qwer!123"; //정해진 특수문자로만 가능함
        expect(isPWPattern(pw)).toEqual(pw);
    });
});

describe('isNumber function', () => {
    test('숫자가 아닐 경우 에러를 표출하는지 확인', () => {
        const val = 'string';
        expect(() => isNumber(val)).toThrowError('[ERROR] This value is not a number.');
    });

    test('숫자일 경우 true값을 반환하는지 확인', () => {
        const val = 123;
        expect(isNumber(val)).toBe(true);
    });
});

describe('isString function', () => {
    test('문자가 아닐 경우 에러를 표출하는지 확인', () => {
        const val = 1234;
        expect(() => isString(val)).toThrowError('[ERROR] This value is not a string.');
    });

    test('문자일 경우 true값을 반환하는지 확인', () => {
        const val = '1234';
        expect(isString(val)).toBe(true);
    });
});