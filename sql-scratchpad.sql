-- select  * from orders_v4_nfts as orders
-- left outer join order_status_v4_nfts order_status on orders.nonce = order_status.nonce
-- where orders.nonce is not null
-- AND orders.nonce = '0x0ec20fd860da445aabbeccb880c38d44'


SELECT erc20_token,
       chain_id,
       nonce,
       app_id,
       app_metadata,
       date_created,
       date_last_updated,
       direction,
       *
from (
         select
                                 -- Only one status update per nonce (there can be many status updates to a single order)
                                 -- We're only interested in the latest status update (as we assume that's it's final resting state, e.g. filled or cancelled
             DISTINCT ON (nonce) *
         from (
               orders_v4_nfts as orders
                  left outer join (
             select block_number,
                    transaction_hash,
                    order_status,
                    nonce as order_nonce_from_update,
                    date_posted_to_db
             from order_status_v4_nfts
             order by nonce,
                      block_number desc,
                      date_posted_to_db desc
         ) as order_status on orders.nonce = order_status.order_nonce_from_update
             )
     ) as orders_with_latest_status
where orders_with_latest_status.nonce is not null
order by orders_with_latest_status.date_posted_to_db desc;

-- AND orders.nonce = '0x0ec20fd860da445aabbeccb880c38d44'
-- 0x7845622560b14d79a7dc07c85bbdf086

drop 
  view if exists orders_with_latest_status;
create view orders_with_latest_status as 
select 
  -- Only one status update per nonce, per maker (there can be many status updates to a single order)
  -- We're only interested in the latest status update (as we assume that's it's final resting state, e.g. filled or cancelled
  DISTINCT ON (nonce, maker) * 
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
        block_number desc, 
        date_posted_to_db desc
    ) as order_status on orders.nonce = order_status.order_nonce_from_update
  );
