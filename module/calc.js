const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

const _mergeDateAndTime = (date, time) => {
	return dayjs(`${date.format('YYYY-MM-DD')}T${time.format('HH:mm:ss')}`);
};

const _calcOpenDateRange = (now, lastOpenDate, openTime) => {
	const rangeDate = Math.ceil(lastOpenDate.diff(now, 'day', true));

	return now.isAfter(_mergeDateAndTime(now, openTime)) ? rangeDate : rangeDate + 1;
};

const calcBookableDateTime = (bookInfo, now) => {
	const openDateRange = _calcOpenDateRange(now, bookInfo.lastOpenDate, bookInfo.openTime);
	const bookableDate = bookInfo.targetDate.subtract(openDateRange, 'day');

	return _mergeDateAndTime(bookableDate, bookInfo.openTime);
};

const convertByDayjs = (rawBookInfo) => {
	const clone = Object.assign({}, rawBookInfo);
	Object.keys(clone)
		.forEach(key => {
			const refinedValue = clone[key].substring(33, clone[key].length - 2);
			const convertedResult = dayjs(refinedValue);
			clone[key] = convertedResult.isValid() ? convertedResult
				: dayjs(refinedValue, 'HH:mm:ss');
		});
	return clone;
}

const getNowKst = () => {
	return dayjs();
};

module.exports = {
	convertByDayjs,
	calcBookableDateTime,
	getNowKst
};