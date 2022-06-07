const makeResponse = (bookableDateTime, nowYear) => {
	const yearPart = bookableDateTime.year() === nowYear ? '' : bookableDateTime.format('YY년 ');
	const body = bookableDateTime.format('M월 D일 H시');
	const minutePart = bookableDateTime.minute() === 0 ? '' : bookableDateTime.format(' m분');
	return `${yearPart}${body}${minutePart}부터 예약 가능합니다.`;
};

module.exports = {
	makeResponse
}