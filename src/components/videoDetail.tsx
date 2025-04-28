import * as React from "react"
import { graphql, type HeadFC } from "gatsby";
// Components
import { PostDetail } from "./parts"
import Seo from "./seo"
// Types
import { typeGraphqlValue } from "../types/typeGraphql"

interface WpPostDetailProps {
  data: {
    wpVideo: typeGraphqlValue | null;
    allWpVideo: { nodes: typeGraphqlValue[]; } | null;
  };
}

const postDetail: React.FC<WpPostDetailProps> = ({ data: { wpVideo, allWpVideo } }) => {
  if (wpVideo) {
    return (
      <PostDetail queryData={wpVideo} queryRelatedData={allWpVideo?.nodes || []} />
    )
  } else {
    return (
      <>
        <p>No Data</p>
      </>
    )
  }
}

export default postDetail

export const pageQuery = graphql`
  # pageContext から $id, $term, $skipRelated を受け取る
  query WpPostDetail($id: String!, $terms: [String!]!, $skipRelated: Boolean!) {

    # 現在表示している投稿を取得
    wpVideo(id: { eq: $id }) {
      id
      title
      date
      resolution
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

    # 関連投稿を取得（$skipRelated が false の場合のみ）
    allWpVideo(
      filter: {
        id: { ne: $id }
        taxVideos: { nodes: { elemMatch: { slug: { in: $terms } } } }
      }
      limit: 8
      sort: { fields: date, order: DESC }
    ) @skip(if: $skipRelated) { # $skipRelated が true ならスキップ
      nodes {
        id
        title
        slug
        uri
        video
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`

export const Head: HeadFC<WpPostDetailProps['data']> = ({ data }) => {
  const title = data.wpVideo?.title ?? "Video Detail";
  return <Seo title={title} />;
}