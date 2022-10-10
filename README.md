# Meta Transaction Graph Queries

This repo allows executing specific queries to the Meta Transaction Graph.

## Getting Started

Install dependencies with `npm ci`.

Copy `.env.example` to `.env`.

Fill `.env` with the required data, `RPC` can be url of any Matic Mainnet RPC provider. You can use https://api.thegraph.com/subgraphs/name/fzavalia/meta-trx-matic-mainnet as `META_TRX_QUERY_URL`. The code of that graph can be found in https://github.com/fzavalia/meta-trx-graph

## Usage

Run with `node . unique-address-count day|week|month|year`.

Depending on the period you provide, it will attempt to count unique addresses that sent Meta Transactions during that last period of time.

You can provide multiple `--name` options to define the Meta Transactions for which contracts to be considered. All are queries if `--name` is not provided.

You can also provide multiple `--not-name` just like with the previous option, but in this case it will ignore Meta Transactions for those contracts. 

You can see the list of name in the ContractName enum from the graph schema https://github.com/fzavalia/meta-trx-graph/blob/main/schema.graphql.