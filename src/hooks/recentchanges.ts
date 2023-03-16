
export interface getRecentChangesOptions {
    kind?:string,
    limit?:number,
    pattern?:string;
}

export interface Action {
    key:string,
    revision:number
} 

export interface RecentChange  {
    changes:Action[]
} 

export interface getRecentChangesPayload {
    list:string[],
}

const defOptions : getRecentChangesOptions = {kind:'add-book', limit:15, pattern:'^/books/*'};

export const getRecentChanges = async({kind, limit, pattern} = defOptions) : Promise<getRecentChangesPayload> => {
    const dtNow = new Date();
    const year = `${dtNow.getFullYear()}`;
    const month = `${1 + dtNow.getMonth()}`.padStart(2, '0');

    const datePart = `/${year}/${month}`;
    const kindPart = kind ? `/${kind}` : '';
    const limitPart = limit ? `?limit=${limit}` : ''

    const matchExp = new RegExp(`${pattern}`, 'gim');

    const response = await fetch(`https://openlibrary.org/recentchanges${datePart}${kindPart}.json${limitPart}`);
    const rawData = await response.json() as RecentChange[];
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const list = (rawData ?? []).map(({changes}) => (changes ?? []).find((change) => matchExp.test(`${change.key}`))?.key?.replace(matchExp, '') || '');
    return Promise.resolve({ list });
}

