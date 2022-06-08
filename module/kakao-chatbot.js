const _calcBlockId = '629edf59ab89e678ee86fb3d';
const _resultImageUrl = 'https://ibb.co/2YTMb5n';

const wrapForSimpleTextFormat = (result) => {
	const layout = _makeDefaultFormat();
	layout.template.outputs.push({
		simpleText: {
			text: result.title + result.description
		}
	});

	return layout;
};

const wrapForBasicCardFormat = (result) => {
	const layout = _makeDefaultFormat();
	layout.template.outputs.push({
		basicCard: {
			title: result.title,
			description: result.description,
			buttons: [
				{
					action: 'block',
					label: '다시 계산하기',
					blockId: _calcBlockId
				}
			]
		}
	});

	return layout;
};

const _makeDefaultFormat = () => {
	return {
		version: '2.0',
		template: {
			outputs: []
		}
	};
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
	wrapForSimpleTextFormat,
	wrapForBasicCardFormat
}