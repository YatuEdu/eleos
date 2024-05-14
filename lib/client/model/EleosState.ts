export type EleosState = {
    id: number
    code: string,
    country: string,
    name: string,
    isCommSate: boolean
}

export const allEleosStates: EleosState[] = [
    {
        id: 1,
        code: 'AL',
        country: 'us',
        name: 'Alabama',
        isCommSate: false
    },
    {
        id: 3,
        code: 'AZ',
        country: 'us',
        name: 'Arizona',
        isCommSate: true
    },
    {
       
        id: 5,
        code: 'CA',
        country: 'us',
        name: 'California',
        isCommSate: true
    },
    {
       
        id: 10,
        code: 'GA',
        country: 'us',
        name: 'Georgia',
        isCommSate: false
    },
    {
       
        id: 28,
        code: 'NY',
        country: 'us',
        name: 'New York',
        isCommSate: false
    },
    {
       
        id: 38,
        code: 'WA',
        country: 'us',
        name: 'Washington',
        isCommSate: true
    },

]