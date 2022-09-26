// Message interface on the PubSub nodejs client
export interface PubSubMessage {
  // message.id = ID of the message.
  id: string
  // message.data = Contents of the message.
  data: string
  // message.attributes = Attributes of the message.
  attributes: any
  // Ack the message:
  ack: () => Promise<void>
  // Nack: This doesn't ack the message, but allows more messages to be retrieved
  // if your limit was hit or if you don't want to ack the message.
  nack: () => void
  // message.publishTime = Date when Pub/Sub received the message.
  publishTime: string
  // message.ackId = ID used to acknowledge the message receival.
}

const PUBSUB_TOPICS = {
  BlockNumberUpdate: 'projects/traderxyz/topics/api.block-number',
  ValidateOrderStatus: 'projects/traderxyz/topics/api.order.validate-status',
  NftMetadataUpdateRequest: 'projects/traderxyz/topics/api.nft-metadata-request',
  NftOpenSeaCollectionScrape: 'projects/traderxyz/topics/api.nft.opensea.scrape.collection-by-address',
}

const PUBSUB_SUBSCRIPTIONS = {
  ProcessExchangeOrderUpdatesByBlockNumber: 'projects/traderxyz/subscriptions/api.order-status.by-block-number.sub',
  SaveNewBlockToTable: 'projects/traderxyz/subscriptions/api.block-table.sub',
  NftMetadataUpdateHandlerSub: 'projects/traderxyz/subscriptions/api.nft-metadata-request.sub',
  NftOpenSeaCollectionScrape: 'projects/traderxyz/subscriptions/api.nft.opensea.scrape.collection-by-address.sub',
}

export { PUBSUB_TOPICS, PUBSUB_SUBSCRIPTIONS }
