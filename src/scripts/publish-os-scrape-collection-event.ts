require('dotenv').config()
import { PubSub } from '@google-cloud/pubsub'
import { GCP_PROJECT_ID } from '../default-config'
import { NftOpenseaScrapeCollectionByAddressRequestEvent } from '../services/utils/messaging-types'
import { PUBSUB_TOPICS } from '../services/utils/pubsub'

const createEvent = (contractAddress: string, chainId: string) => {
  const scrapeCollectionRequestMessage: NftOpenseaScrapeCollectionByAddressRequestEvent = {
    data: {
      contractAddress: contractAddress.toLowerCase(),
      chainId,
    },
    eventName: 'nft.opensea.scrape.collection-by-address',
    topic: PUBSUB_TOPICS.NftOpenSeaCollectionScrape,
  }

  return scrapeCollectionRequestMessage
}

const COLLECTIONS_TO_INDEX_MAINNET_ONLY: Array<[string, string]> = [['0xed5af388653567af2f388e6224dc7c4b3241c544', '1']]

const doAsync = async () => {
  const pubsub = new PubSub({ projectId: GCP_PROJECT_ID })

  // Create publisher options
  const options = {
    flowControlOptions: {
      maxOutstandingMessages: 50,
      maxOutstandingBytes: 10 * 1024 * 1024, // 10 MB
    },
  }

  const collectionScrapeTopic = pubsub.topic(PUBSUB_TOPICS.NftOpenSeaCollectionScrape, options)

  // For flow controlled publishing, we'll use a publisher flow controller
  // instead of `topic.publish()`.
  const flow = collectionScrapeTopic.flowControlled()

  // Publish messages in a fast loop.
  for (let i = 0; i < COLLECTIONS_TO_INDEX_MAINNET_ONLY.length; i++) {
    const [contractAddress, chainId] = COLLECTIONS_TO_INDEX_MAINNET_ONLY[i]
    // You can also just `await` on `publish()` unconditionally, but if
    // you want to avoid pausing to the event loop on each iteration,
    // you can manually check the return value before doing so.
    const wait = flow.publish({
      data: Buffer.from(JSON.stringify(createEvent(contractAddress, chainId))),
      orderingKey: chainId,
      attributes: {
        chainId: chainId,
      },
    })
    if (wait) {
      await wait
    }
  }

  console.log('Published all messages')
}

doAsync()
