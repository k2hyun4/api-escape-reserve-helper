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

const _makeResponse = (bookableDateTime, now) => {
	return '결과 하하호호';
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
	const {now} = bookInfo;
	const bookableDateTime = _calcBookableDateTime(bookInfo);
	return _makeResponse(bookableDateTime, now);
};

module.exports = {
	_convertByDayjs,
	_calcBookableDateTime,
	_calcOpenDateRange,
	getBookAdvice
};