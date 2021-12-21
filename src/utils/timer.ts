export const timeout = (milliseconds: any) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}