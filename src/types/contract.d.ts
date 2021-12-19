interface AuctionDetails
{
    adSeller: string,
    adCurrency: string,
    adToken: string,
    adDeadline: string,
    adStartTime: string,    
    adMinBid: string,
    adMarketplacePercent: string,
    adMarketplaceAddress: string,
}

interface BidDetails 
{
    bdBidder: string,
    bdBid: string,
}

interface AuctionDatum 
{
    adAuctionDetails: AuctionDetails,
    adBidDetails?: BidDetails,
}

interface AuctionRedeemer 
{
    arBidDetails?: BidDetails,
}
