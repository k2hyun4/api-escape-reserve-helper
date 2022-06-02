const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

const _makeDateTime = (date, time) => {
	return dayjs(`${date.format('YYYY-MM-DD')}T${time.format('HH:mm:ss')}`);
};

const _calcBookableDateTime = (bookInfo) => {
	const openDateRange = _calcOpenDateRange(bookInfo.now, bookInfo.lastOpenDate, bookInfo.openTime);
	const bookableDate = bookInfo.targetDate.subtract(openDateRange, 'day');

	return _makeDateTime(bookableDate, bookInfo.openTime);
};

const _calcOpenDateRange = (now, lastOpenDate, openTime) => {
	//TODO 음수 처리
	const rangeDate = Math.ceil(lastOpenDate.diff(now, 'day', true));

	return now.isAfter(_makeDateTime(now, openTime)) ? rangeDate : rangeDate + 1;
};

const _makeResponse = (bookableDateTime, nowYear) => {
	const yearPart = bookableDateTime.year() === nowYear ? '' : bookableDateTime.format('YY년 ');
	const body = bookableDateTime.format('M월 D일 H시');
	const minutePart = bookableDateTime.minute() === 0 ? '' : bookableDateTime.format(' m분');
	//TODO 이미 열린 경우 등 처리
	return `${yearPart}${body}${minutePart}부터 예약 가능합니다.`;
};

const _convertByDayjs = (rawBookInfo) => {
	const clone = Object.assign({}, rawBookInfo);
	Object.keys(clone)
		.forEach(key => {
			const convertedResult = dayjs(clone[key]);
			clone[key] = convertedResult.isValid() ? convertedResult
				: dayjs(clone[key], 'HH:mm:ss');
		});
	return clone;
}

const getBookAdvice = (rawBookInfo) => {
	const bookInfo = _convertByDayjs(rawBookInfo);
	const bookableDateTime = _calcBookableDateTime(bookInfo);
	return _makeResponse(bookableDateTime, bookInfo.now.year());
};

module.exports = {
	_convertByDayjs,
	_calcBookableDateTime,
	_calcOpenDateRange,
	getBookAdvice
};