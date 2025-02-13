import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
jest.mock('semantic-ui-css/semantic.min.css', () => {});
jest.mock('./routes/CharacterInfo/CharacterInfo.css', () => {});
jest.mock('./routes/CharactersList/CharactersList.css', () => {});
jest.mock('./App.css', () => {});
