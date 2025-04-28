import * as React from "react"
import { type HeadFC, type PageProps, graphql } from "gatsby"
// Components
import Seo from "./seo"
import { PostArchive } from "./parts"
// types
import { typeGraphqlValue, pageInfoType } from "../types/typeGraphql"

interface IndexPageData {
  allWpPhoto: {
    edges: {
      node: typeGraphqlValue;
    }; // 取得したデータの配列
    pageInfo: pageInfoType
  };
}

const archivePhoto: React.FC<PageProps<IndexPageData>> = ({ data }) => {
  // Page Query の結果を直接使用
  const photosData = data.allWpPhoto.edges;
  const pageInfo = data.allWpPhoto.pageInfo; // ページ情報

  return (
    <PostArchive queryData={photosData} pageInfo={pageInfo} />
  )
}

export default archivePhoto;

export const Head: HeadFC = () => <Seo title="Photos" />

export const pageQuery = graphql`
  query WpPhotoArchiveQuery($skip: Int!, $limit: Int!) {
    allWpPhoto (limit: $limit, skip: $skip) {
      edges {
        node {
          id
          title
          slug
          date
          uri
          featuredImage {
            node {
              sourceUrl
            }
          }
          taxPhotos {
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