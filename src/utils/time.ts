export const timeout = (milliseconds: any) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export const getCountdown = (auctionDatum: AuctionDatum): Countdown => {
    if (!auctionDatum) return { } as Countdown;

    // Decrement endDateTime by 15 minutes to account for ttl (time to live)
    const fifteenMinutes = 1000 * 60 * 15;
    const twoHours = 1000 * 60 * 60 * 2;
    const endDatetime = parseInt(auctionDatum.adAuctionDetails.adDeadline);
    const now = Date.now();
    const difference = (endDatetime - twoHours - fifteenMinutes) - now;

    const countdown: Countdown = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
    };
    return countdown;
}