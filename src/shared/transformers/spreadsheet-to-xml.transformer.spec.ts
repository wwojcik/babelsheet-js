import SpreadsheetToXmlTransformer from './spreadsheet-to-xml.transformer';
import ITransformer from '../../shared/transformers/transformer';

const spreeadsheetToJson: ITransformer = {
  supports: type => false,
  transform: jest.fn(() => 'spreadsheet return'),
};

const jsonToXml: ITransformer = {
  supports: type => false,
  transform: jest.fn(() => 'xml return'),
};

describe('SpreadsheetToXmlTransformer', () => {
  const spreadsheetToXmlTransformer = new SpreadsheetToXmlTransformer(spreeadsheetToJson, jsonToXml);

  it('does return true if supported type', async () => {
    const result = spreadsheetToXmlTransformer.supports('xml');

    expect(result).toBeTruthy();
  });

  it('does return false if not supported type', async () => {
    const result = spreadsheetToXmlTransformer.supports('xyz');

    expect(result).toBeFalsy();
  });

  it('does generate xml from spreadsheet', async () => {
    const object = { test: ['test'] };
    const langCode = 'en_US';

    spreadsheetToXmlTransformer.transform(object, langCode);

    expect(spreeadsheetToJson.transform).toBeCalledWith(object, langCode);
    expect(jsonToXml.transform).toBeCalledWith('spreadsheet return');
  });
});
