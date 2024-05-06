type TemplateData = Record<string, any>;

function dynamicTemplate<T extends TemplateData>(strings: TemplateStringsArray, ...keys: (keyof T)[]): (data: T) => string {
    return function (data: T): string {
        let result = strings[0];
        keys.forEach((key, i) => {
            result += data[key] + strings[i + 1];
        });
        return result;
    };
}

// Eleos Button Class template
const btnClassTemplate = dynamicTemplate<{bgColor: string; hoverBgColor:string, txtColor: string, }>
`py-1 px-3 mt-2 bg-${'bgColor'} text-${'txtColor'} rounded hover:bg-${'hoverBgColor'} transition-colors`;

// Disabled Eleos Button Class template
const btnClassDiaabledTemplate = dynamicTemplate<{bgColor: string; txtColor: string }>
`py-1 px-3 mt-2 bg-${'bgColor'} text-${'txtColor'} rounded cursor-not-allowed transition-colors`;

// wizard button
export const BUTTON_CLASS_GREEN = btnClassTemplate({ bgColor: 'green-600', hoverBgColor: 'green-700', txtColor: 'white', });
// disabled wizard button
export const BUTTON_CLASS_DISABLED = btnClassDiaabledTemplate({ bgColor: 'pink-200', txtColor: 'white',});
// mixed button
export const BUTTON_CLASS_BLUE = btnClassTemplate({ bgColor: 'blue-600', hoverBgColor: 'blue-700', txtColor: 'white', });

