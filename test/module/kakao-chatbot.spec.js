const kakaoChatbotModule = require('../../module/kakao-chatbot');
const {expect} = require('chai');

describe('kakao 전송 데이터 테스트', () => {
	const rawBody = {
		action: {
			params: {
				lastOpenDate: '{"UserTimeZone":"Asia +9 Hour", "value":"2022-06-08"}'
			}
		}
	};

	const parsedData = kakaoChatbotModule.parseRequestParamValue(rawBody);

	it('parsing한 데이터에 lastOpenDate가 존재해야 한다.', () => {
		expect(parsedData.lastOpenDate).to.exist;
	});

	it('lastOpenDate가 유효한 Date값이어야 한다.', () => {
		expect(isNaN(new Date(parsedData.lastOpenDate))).to.be.false;
	});
});