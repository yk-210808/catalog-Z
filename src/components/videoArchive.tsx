import * as React from "react"
import { type HeadFC, type PageProps, graphql } from "gatsby"
// Components
import Seo from "./seo"
import { PostArchive } from "./parts"
// types
import { typeGraphqlValue, pageInfoType } from "../types/typeGraphql"

interface IndexPageData {
  allWpVideo: {
    edges: {
      node: typeGraphqlValue;
    }; // 取得したデータの配列
    pageInfo: pageInfoType
  };
}

const wpArchiveVideo: React.FC<PageProps<IndexPageData>> = ({ data }) => {
  // Page Query の結果を直接使用
  const queryData = data.allWpVideo.edges;
  const pageInfo = data.allWpVideo.pageInfo; // ページ情報

  return (
    <PostArchive queryData={queryData} pageInfo={pageInfo} />
  )
}

export default wpArchiveVideo;

export const Head: HeadFC = () => <Seo title="Videos" />

export const pageQuery = graphql`
  query WpVideoArchiveQuery($skip: Int!, $limit: Int!) {
    allWpVideo (limit: $limit, skip: $skip) {
      edges {
        node {
          id
          title
          slug
          date
          uri
          video
          featuredImage {
            node {
              sourceUrl
            }
          }
          taxVideos {
            nodes {
              slug
              name
            }
          }
        }
      }
      pageInfo { # ページネーション用の情報を取得
        totalCount
        currentPage
        hasNextPage
        hasPreviousPage
        itemCount # 現在のページに表示されているアイテム数
        pageCount # 全ページ数
        perPage # 1ページあたりのアイテム数 (limit と同じはず)
      }
    }
  }
`