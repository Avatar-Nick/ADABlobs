interface Blobs { [asset: string]: BlobChainAsset }

interface BlobChainAsset {
    asset: string,
    policy_id: string,
    asset_name: string,
    fingerprint: string,
    quantity: string,
    initial_mint_tx_hash: string,
    mint_or_burn_count: number,
    onchain_metadata: BlobChainAssetMetadata,
    metadata: null
}

interface BlobChainAssetMetadata {
    project: string,
    id: number,
    name: string,
    image: string,
    color: string,
    hex: string,
}