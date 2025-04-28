import * as React from "react"
import { graphql, type HeadFC } from "gatsby";
// Components
import { PostDetail } from "./parts"
import Seo from "../components/seo"
// Types
import { typeGraphqlValue } from "../types/typeGraphql"

interface PostDetailProps {
  data: {
    wpPhoto: typeGraphqlValue | null;
    allWpPhoto: { nodes: typeGraphqlValue[]; } | null;
  };
}

const wpPostDetail: React.FC<PostDetailProps> = ({ data: { wpPhoto, allWpPhoto } }) => {
  if (wpPhoto) {
    return (
      <PostDetail queryData={wpPhoto} queryRelatedData={allWpPhoto?.nodes || []} />
    )
  } else {
    return (
      <>
        <p>No Data</p>
      </>
    )
  }
}

export default wpPostDetail

export const pageQuery = graphql`
  # pageContext から $id, $term, $skipRelated を受け取る
  query WpPostDetail($id: String!, $terms: [String!]!, $skipRelated: Boolean!) {

    # 現在表示している投稿を取得
    wpPhoto(id: { eq: $id }) {
      id
      title
      date
      dimension
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      taxPhotos {
        nodes {
          slug
          name
        }
      }
    }

    # 関連投稿を取得 ($skipRelated が false の場合のみ)
    allWpPhoto(
      filter: {
        id: { ne: $id }
        taxPhotos: { nodes: { elemMatch: { slug: { in: $terms } } } }
      }
      limit: 8
      sort: { fields: date, order: DESC }
    ) @skip(if: $skipRelated) { # $skipRelated が true ならスキップ
      nodes {
        id
        title
        slug
        uri
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
  const title = data.wpPhoto?.title ?? "Photo Detail";
  return <Seo title={title} />;
}