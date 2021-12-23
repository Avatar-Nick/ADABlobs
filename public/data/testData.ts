export const getTestBidData = () => 
{
    const now = Date.now();
    const datum: AuctionDatum = {
        adAuctionDetails: {
            adCurrency: "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf3916522",
            adDeadline: (now + 3600 * 1000).toString(),
            adMarketplaceAddress: "8277b5c2f4553e874dd6bfe6b044826104a862fff33813c513461529",
            adMarketplacePercent: "10",
            adMinBid: "1200000000",
            adSeller: "30ca3887e827864907adf13322ea12c87d17e2ef0bea8601bb52f077",
            adStartTime: now.toString(),
            adToken: "4d494e54",
        },
        adBidDetails: { 
            bdBidder: "30ca3887e827864907adf13322ea12c87d17e2ef0bea8601bb52f077", 
            bdBid: "14000000", 
        }
    };
    const sellerAddress = "addr_test1qqcv5wy8aqncvjg84hcnxgh2zty869lzau974psphdf0qama8rp3slv8rsracgd2tx403hvkx39a4wp0tc5cywq95spswq5q4m";
    const bidderAddress = "addr_test1qqcv5wy8aqncvjg84hcnxgh2zty869lzau974psphdf0qama8rp3slv8rsracgd2tx403hvkx39a4wp0tc5cywq95spswq5q4m";

    return { datum, sellerAddress, bidderAddress }
}

export const getTestCloseData = () => 
{
    const now = Date.now();
    const datum: AuctionDatum = {
        adAuctionDetails: {
            adCurrency: "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf3916522",
            adDeadline: (now - 1000).toString(),
            adMarketplaceAddress: "8277b5c2f4553e874dd6bfe6b044826104a862fff33813c513461529",
            adMarketplacePercent: "10",
            adMinBid: "10000000",
            adSeller: "30ca3887e827864907adf13322ea12c87d17e2ef0bea8601bb52f077",
            adStartTime: (now - 2000).toString(),
            adToken: "4d494e54",
        },
        adBidDetails: { 
            bdBidder: "30ca3887e827864907adf13322ea12c87d17e2ef0bea8601bb52f077", 
            bdBid: "14000000", 
        }
    };
    const sellerAddress = "addr_test1qqcv5wy8aqncvjg84hcnxgh2zty869lzau974psphdf0qama8rp3slv8rsracgd2tx403hvkx39a4wp0tc5cywq95spswq5q4m";
    const bidderAddress = "addr_test1qqcv5wy8aqncvjg84hcnxgh2zty869lzau974psphdf0qama8rp3slv8rsracgd2tx403hvkx39a4wp0tc5cywq95spswq5q4m";

    return { datum, sellerAddress, bidderAddress }
}