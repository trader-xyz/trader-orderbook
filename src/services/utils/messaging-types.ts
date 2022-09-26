type AvailableEventName =
  | 'block-number.update'
  | 'order.validate-status'
  | 'nft.metadata.update.individual'
  | 'nft.metadata.update.collection'
  | 'nft.opensea.scrape.collection-by-address'

export interface BaseEvent {
  topic: string
  eventName: AvailableEventName
  data: Record<string, any>
}

export interface BlockNumberUpdateEvent extends BaseEvent {
  eventName: 'block-number.update'
  data: {
    blockNumber: number
    chainId: string
    timestamp: string
    hash: string
    parentHash: string
    nonce: string
  }
}

export interface OrderStatusUpdateRequestEvent extends BaseEvent {
  eventName: 'order.validate-status'
  data: {
    orderNonce: string
    chainId: string
  }
}

export interface NftMetadataRequestEvent extends BaseEvent {
  eventName: 'nft.metadata.update.individual'
  data: {
    contractAddress: string
    chainId: string
    tokenId: string
  }
}

export interface NftMetadataCollectionRequestEvent extends BaseEvent {
  eventName: 'nft.metadata.update.collection'
  data: {
    contractAddress: string
    chainId: string
    startToken?: string
  }
}

export interface NftOpenseaScrapeCollectionByAddressRequestEvent extends BaseEvent {
  eventName: 'nft.opensea.scrape.collection-by-address'
  data: {
    contractAddress: string
    chainId: string
  }
}

export type AvailableEvents =
  | BlockNumberUpdateEvent
  | OrderStatusUpdateRequestEvent
  | NftMetadataRequestEvent
  | NftMetadataCollectionRequestEvent
  | NftOpenseaScrapeCollectionByAddressRequestEvent
