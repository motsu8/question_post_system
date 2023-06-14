export type Input = {
    url: string;
    title: Function;
    expect: Function;
    contents: Function;
    tried: Function;
    active: string;
};

export type Form = {
    question: string,
    url: string;
    title: string;
    expect: string;
    contents: string;
    tried: string;
    active: string;
    code: string;
    console: string;
};
