import * as React from "react"
import { type HeadFC, useStaticQuery, graphql } from "gatsby"
// Components
import Seo from "../components/seo"
import Layout from "../components/layout"
import { Kv, FormSearch, GridList, GridListItem } from "../components/parts"
// Plugins
import * as JsSearch from 'js-search';
import { Search, type ITokenizer } from "js-search"
import TinySegmenter from 'tiny-segmenter';
// Contexts
import { SearchQueryContext } from "../contexts/searchQueryContext"
// Types
import { typeGraphqlValue } from "../types/typeGraphql"

// 日本語対応
const segmenter = new TinySegmenter();
const japaneseTokenizer: ITokenizer = {
  tokenize(text: string): string[] {
    if (!text) {
      return [];
    }
    // TinySegmenter で分かち書きし、小文字に変換して返す
    return segmenter.segment(String(text).toLowerCase());
  }
};

const SearchPage = () => {

  const data = useStaticQuery(graphql`
    query SearchDataQuery {
      allWpPhoto (limit: 1000) {
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
          taxPhotos {
            nodes {
              slug
              name
            }
          }
        }
      }
      allWpVideo (limit: 1000) {
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
          taxVideos {
            nodes {
              slug
              name
            }
          }
        }
      }
    }
  `)

  const [searchEngine, setSearchEngine] = React.useState<Search | null>(null)
  const [searchResults, setSearchResults] = React.useState<typeGraphqlValue[]>([])
  const { searchQuery } = React.useContext(SearchQueryContext)

  React.useEffect(() => {
    const photos = data.allWpPhoto.nodes;
    const videos = data.allWpVideo.nodes;

  // 検索用にデータを整形
  const processedPhotos = photos.map((photo: typeGraphqlValue) => ({
    ...photo,
    tagNames:  photo.taxPhotos?.nodes.map((tax) => tax.name).join(' '), // 多階層だと検索できないため、タグ名を結合
  }));
  const processedVideos = videos.map((video: typeGraphqlValue) => ({
    ...video,
    tagNames: video.taxVideos?.nodes?.map((tax) => tax?.name).join(' '), // 多階層だと検索できないため、タグ名を結合
  }));

  const allData = [...processedPhotos, ...processedVideos]
  

    if (allData.length > 0) {
      const engine = new JsSearch.Search("id");
      engine.tokenizer = japaneseTokenizer;
      engine.addIndex("title");
      engine.addIndex("slug");
      engine.addIndex("uri");
      engine.addIndex("tagNames");
      engine.addDocuments(allData);
      setSearchEngine(engine);
    }
  }, [data])

  React.useEffect(() => {
    if (searchEngine && searchQuery.query) {
      const results = searchEngine.search(searchQuery.query) as typeGraphqlValue[];
      setSearchResults(results);
    } else {
      // 検索クエリがない場合は結果をクリア
      setSearchResults([]);
    }
  }, [searchQuery, searchEngine])

  return (
    <Layout>
      <Kv>
        <FormSearch />
      </Kv>

      <div className="container-fluid tm-container-content tm-mt-60">
        <div className="row mb-4">
          <h2 className="col-6 tm-text-primary">
            Search Results： {searchQuery.query}
          </h2>
        </div>

        { searchResults.length > 0 && (
        <GridList>
          {searchResults.map((item: typeGraphqlValue) => (
            <GridListItem data={item} key={item.id} />
          ))}
        </GridList>
        )}
      </div>
    </Layout>
  )
}

export default SearchPage;

export const Head: HeadFC = () => <Seo title="Search" />