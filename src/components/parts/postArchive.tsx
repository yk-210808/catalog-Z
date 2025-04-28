import * as React from "react";
import { Link, navigate } from "gatsby";
// Components
import { Kv, FormSearch, GridList, GridListItem } from "./index";
import Layout from "../layout";
// Types
import { typeGraphqlValue, pageInfoType } from "../../types/typeGraphql";
// Plugin
import ReactPlayer from "react-player";
// Utils
import { isVideoPage } from "../../utils/postUtil";

interface WpPostArchiveProps {
  queryData: {
    node: typeGraphqlValue; // 取得したデータの配列
  };
  pageInfo: pageInfoType
}

export const PostArchive: React.FC<WpPostArchiveProps> = ({ queryData, pageInfo }) => {
  const videoPageFlg = isVideoPage();
  const title = videoPageFlg ? "Videos" : "Photos";
  const [inputPaginationNumber, setInputPaginationNumber] = React.useState<number>(Number(pageInfo.currentPage));

  function createPath(pageNumber: number) {
    const basePath = videoPageFlg ? "/videos/" : "/";

    if (pageNumber === 1) {
      return basePath;
    } else {
      return `${basePath}pages/${pageNumber}`;
    }
  }

  function KvElements() {
    if (videoPageFlg) {
      return (
        <div className="tm-hero d-flex justify-content-center align-items-center" id="tm-video-container">
          <ReactPlayer url={"/video/hero.mp4"} loop width={"100%"} height={"auto"} muted={true} playing={true} controls={false} id="tm-video" />
          <FormSearch className="position-absolute" />
        </div>
      )
    } else {
      return (
        <Kv>
          <FormSearch />
        </Kv>
      )
    }
  }

  React.useEffect(() => {
    if(inputPaginationNumber > pageInfo.pageCount || inputPaginationNumber < 1 || isNaN(inputPaginationNumber)) {
      return
    }

    if (inputPaginationNumber !== pageInfo.currentPage) {
      const path = createPath(inputPaginationNumber);
      navigate(path)
    }
  }, [inputPaginationNumber]);

  return (
    <Layout>

      <KvElements />

      <div className="container-fluid tm-container-content tm-mt-60">

        <div className="row mb-4">
          <h2 className="col-6 tm-text-primary">
            Latest {title}
          </h2>
          <div className="col-6 d-flex justify-content-end align-items-center">
            <div className="tm-text-primary">
              Page <input type="number" defaultValue={inputPaginationNumber} className="tm-input-paging tm-text-primary no-arrow" onChange={(e) => setInputPaginationNumber(Number(e.target.value))} max={pageInfo.pageCount} min="1" /> of {pageInfo.pageCount}
            </div>
          </div>
        </div>

        <GridList>
          {Object.keys(queryData).length > 0 && queryData.map(({ node: value }: { node: typeGraphqlValue }) => (
            <GridListItem data={value} key={value.id} />
          ))}
        </GridList>

        <div className="row tm-mb-90">
          <div className="col-12 d-flex justify-content-between align-items-center tm-paging-col">
            <Link to={pageInfo.hasPreviousPage ? createPath(pageInfo.currentPage - 1) : "#"} className={`btn btn-primary tm-btn-prev mb-2 ${!pageInfo.hasPreviousPage ? 'disabled' : ''}`}>Previous</Link>
            <div className="tm-paging d-flex">
              {Array.from({ length: pageInfo.pageCount }, (_, i) => i + 1).map(page => (
                <Link
                  key={page}
                  to={createPath(page)}
                  className={`tm-paging-link ${pageInfo.currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </Link>
              ))}
            </div>
            <Link to={pageInfo.hasNextPage ? createPath(pageInfo.currentPage + 1) : "#"} className={`btn btn-primary tm-btn-next ${!pageInfo.hasNextPage ? 'disabled' : ''}`}>Next Page</Link>
          </div>
        </div>

      </div>


    </Layout>
  )
}