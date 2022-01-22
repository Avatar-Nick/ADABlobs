export const idToString = (id: Number) => 
{
    let idString = id.toString();
    
    let count = idString.length;
    for (let i = count; i < 3; i++) 
    {
        idString = `${0}${idString}`;
    }
    return `${idString}`;
}

export const idToLongString = (id: Number) => 
{
    let idString = idToString(id);
    return `${"#"}${idString}`;
}