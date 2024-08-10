import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    /* Add your global styles here */
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
    }

    /* Add more global styles as needed */

`;

export default GlobalStyles;

export class StaticStypes {
    static readonly TABLE_BK_COLOR = { color: '#FFD700' }
    static readonly DIALOG_TITLE_COLOR = { color: '#36454F' }
}