interface AuctionDetails
{
    adSeller: string,
    adCurrency: string,
    adToken: string,
    adDeadline: string,
    adStartTime: string,
    adMinBid: string,
}

interface BidDetails 
{
    bdBidder: string,
    bdBid: Number,
}

interface AuctionDatum 
{
    adAuctionDetails: AuctionDetails,
    adBidDetails?: BidDetails,
}