const wrapForSimpleTextFormat = (result) => {
	return {
		version: '2.0',
		template: {
			outputs: [
				{
					simpleText: {
						text: result
					}
				}
			]
		}
	}
};

const parseRequestParamValue = (body) => {
	const params = body.action.params;
	const result = {};
	Object.keys(params)
		.forEach(key => result[key] = JSON.parse(params[key]).value);

	return result;
};

module.exports = {
	parseRequestParamValue,
	wrapForSimpleTextFormat
}