const _calcBlockId = '629edf59ab89e678ee86fb3d';

const responseCalcResult = (result) => {
	return _wrapForBasicCardFormat(result, '다시 계산하기');
};

const responseCheck = () => {
	return _wrapForBasicCardFormat(
		{
			title: '원하는 기능을 선택해주세요', 
			description: '반응이 없으면 잠시 후 버튼을 다시 클릭해주세요.'
		}, 
		'예약일 계산하기');
};

const _wrapForSimpleTextFormat = (result) => {
	const layout = _makeDefaultFormat();
	layout.template.outputs.push({
		simpleText: {
			text: result.title + result.description
		}
	});

	return layout;
};

const _wrapForBasicCardFormat = (result, buttonLabel) => {
	const layout = _makeDefaultFormat();
	layout.template.outputs.push({
		basicCard: {
			title: result.title,
			description: result.description,
			buttons: [
				{
					action: 'block',
					label: buttonLabel,
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
	responseCheck,
	responseCalcResult
}