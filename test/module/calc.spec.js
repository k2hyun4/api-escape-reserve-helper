const calcModule = require('../../module/calc');
const assert = require('assert');
const dayjs = require('dayjs');

const rawBookInfo = {
	now: '2022-06-01T10:00:00',
	lastOpenDate: '2022-06-07',
	openTime: '00:00:00',
	targetDate: '2022-06-08'
};

const bookInfo = calcModule.convertByDayjs(rawBookInfo);

describe('dayjs 변환 테스트', () => {
	const rawData = rawBookInfo;
	const actual = calcModule.convertByDayjs(rawData);

	it('bookInfo의 모든 키가 존재한다.', () => {
		Object.keys(rawData)
			.forEach(key => {
				console.log('key : ', key);
				assert(actual.hasOwnProperty(key));
			});
	});

	it('모두 유효한 dayjs 객체다.', () => {
		Object.keys(actual)
			.forEach(key => {
				console.log('key : ', key);
				assert(dayjs.isDayjs(actual[key]));
				assert(actual[key].isValid());
			});
	});
});

describe('예약 가능일 계산 테스트(샘플 데이터 기준)', () => {
	describe('nowTime이 openTime 이후일 때', () => {
		const testBookInfo = Object.assign({}, bookInfo);
		testBookInfo.openTime = testBookInfo.now
			.subtract(1, 'second');

		it('예약일은 내일이어야 한다.', () => {
			const actual = calcModule.calcBookableDateTime(testBookInfo);
			const expect = testBookInfo.now
				.add(1, 'day');
			assert(expect.isSame(actual, 'day'));
		});
	});

	describe('nowTime이 openTime 이전일 때', () => {
		const testBookInfo = Object.assign({}, bookInfo);
		testBookInfo.openTime = testBookInfo.now
			.add(1, 'second');
		it('예약일은 오늘이어야 한다.', () => {
			const actual = calcModule.calcBookableDateTime(testBookInfo);
			assert(testBookInfo.now
				.isSame(actual, 'day'));
		});
	});
});