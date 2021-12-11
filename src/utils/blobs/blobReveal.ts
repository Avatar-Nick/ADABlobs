// Hardcode the blob address here

export const isBlobRevealed = (blob: BlobChainAsset, blobCount: number | undefined) => {
    return blobCount && blob.onchain_metadata.id <= blobCount;
}

export const isHomeAddress = (address: string | undefined) => {
    const homeAddress = "";    
    return homeAddress === address;
}

// Blobs are revealed 1 per week until all 300 are revealed
export const getBlobRevealCount = () => {
    //const now = new Date(Date.now());
    const now = new Date("2028-12-25T12:00:00.000Z");
    const daysSinceStart = getDaysSinceStartDate(now);

    const daysInWeek = 7;
    const totalBlobs = 300;

    let revealedBlobs = Math.floor(daysSinceStart / daysInWeek) + 1;
    if (revealedBlobs > totalBlobs) {
        revealedBlobs = totalBlobs;
    }
    
    return revealedBlobs;
}

const getDaysSinceStartDate = (localDatetime: Date) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const startDatetime = new Date("2021-12-18T12:00:00.000Z");
    const utcStartDatetime = getUTCDatetime(startDatetime);
    const utcNow = getUTCDatetime(localDatetime);
    
    // Calculate the difference in milliseconds and convert to days
    let daysSinceStart = Math.floor((utcNow.getTime() - utcStartDatetime.getTime()) / (oneDay));
    
    // Remove decimal and return;
    return daysSinceStart; 
}

const getUTCDatetime = (localDatetime: Date) => {
    return new Date(localDatetime.getUTCFullYear(), localDatetime.getUTCMonth(), localDatetime.getUTCDate(), localDatetime.getUTCHours(), localDatetime.getUTCMinutes(), localDatetime.getUTCSeconds());
}
