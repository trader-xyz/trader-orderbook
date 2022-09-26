import SQL, { join } from 'pg-template-tag'
import { CHAIN_IDS } from '../default-config'
import { getPrismaClient } from '../prisma-client'

interface QueryConfig {
  limit: number
  offset: number
}

interface GetOrdersWithOrderStatusQueryOptions {
  chainId: string
}

const query = (options: GetOrdersWithOrderStatusQueryOptions, queryConfig: Partial<QueryConfig> = {}) => {
  // var conditions = [];
  // if (filter.email) conditions.push(SQL`email like ${filter.email}`);
  // if (filter.minAge) conditions.push(SQL`age > ${filter.minAge}`);
  // if (filter.maxAge) conditions.push(SQL`age < ${filter.maxAge}`);
  // return connection.query(SQL`select * from users where ${SQL.join(conditions, ' and ')}`);

  const finalConfig: QueryConfig = {
    limit: 1000,
    offset: 0,
    ...queryConfig,
  }

  let conditions: any[] = [SQL`orders_with_latest_status.nonce is not null`]
  if (options.chainId) {
    conditions.push(SQL`chain_id = ${options.chainId}`)
  }
  const conditionsSql = join(conditions, ' and ')

  return SQL`
  select
      -- pls fix
      *
  from
    (
      select
      -- Only one status update per nonce (there can be many status updates to a single order)
      -- We're only interested in the latest status update (as we assume that's it's final resting state, e.g. filled or cancelled
        DISTINCT ON (nonce) *
      from
        (
          orders_v4_nfts as orders
          left outer join (
            select
              block_number,
              transaction_hash,
              order_status,
              nonce as order_nonce_from_update,
              date_posted_to_db
            from
              order_status_v4_nfts
            order by
              nonce,
              block_number desc,
              date_posted_to_db desc
          ) as order_status on orders.nonce = order_status.order_nonce_from_update
        )
    ) as orders_with_latest_status
  where
    ${conditionsSql}
  order by
    orders_with_latest_status.date_posted_to_db desc
  limit 
    ${finalConfig.limit}
  offset
    ${finalConfig.offset}
  `
}

const doAsync = async () => {
  const prisma = getPrismaClient()

  const foo = await prisma.orders_with_latest_status.findFirst({
    where: {
      nonce: '0xc240339744dd481dbc5b50992442d553',
      chain_id: CHAIN_IDS.ROPSTEN,
    },
  })

  console.log('foo', foo)
}

doAsync()
