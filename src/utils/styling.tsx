export const ifStyle = (baseStyle: string, ...condStyles: [cond: boolean, style: string, ][]): string => {
    let style: string = baseStyle;

    for (let condStyle of condStyles) {
        if (condStyle[0]) style += " " + condStyle[1];
    }

    return style;
};