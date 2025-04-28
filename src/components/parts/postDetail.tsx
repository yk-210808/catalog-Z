import * as React from "react";
// // Components
import Layout from "../layout";
import { Kv, FormSearch, GridList, GridListItem } from "./index";
// Utils
import { GetThumbOrVideo, GetFileFormat, formatDuration } from "../../utils/postUtil";
// Types
import { typeGraphqlValue } from "../../types/typeGraphql";

interface PostDetailProps {
  queryData: typeGraphqlValue;
  queryRelatedData: typeGraphqlValue[] | [];
}

interface categoryType {
  slug: string;
  name: string;
}


export const PostDetail: React.FC<PostDetailProps> = ({ queryData, queryRelatedData }) => {
  const tags: categoryType[] = queryData.taxPhotos?.nodes || queryData.taxVideos?.nodes || [];
  const relatedItemsTitle = queryData.video ? 'Videos' : 'Photos';

  const [duration, setDuration] = React.useState<number>(0);
  const handleDuration = (durationInSeconds: number) => {
    setDuration(durationInSeconds);
  };

  return (
    <Layout>
      <Kv>
        <FormSearch />
      </Kv>

      <div className="container-fluid tm-container-content tm-mt-60">
        <div className="row mb-4">
          <h2 className="col-12 tm-text-primary">{queryData.title}</h2>
        </div>
        <div className="row tm-mb-90">
          <div className="col-xl-8 col-lg-7 col-md-6 col-sm-12">
            <GetThumbOrVideo {...queryData} onDuration={handleDuration} />
          </div>
          <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
            <div className="tm-bg-gray tm-video-details">
              <p className="mb-4">
                Please support us by making <a href="https://paypal.me/" target="_parent" rel="sponsored">a PayPal donation</a>. Nam ex nibh, efficitur eget libero ut, placerat aliquet justo. Cras nec varius leo.
              </p>
              <div className="text-center mb-5">
                <a href="#" className="btn btn-primary tm-btn-big">Download</a>
              </div>
              <div className="mb-4 d-flex flex-wrap">

                {queryData.dimension && (
                  <div className="mr-4 mb-2">
                    <span className="tm-text-gray-dark">Dimension: </span><span className="tm-text-primary">{queryData.dimension}</span>
                  </div>
                )}

                {queryData.resolution && (
                  <div className="mr-4 mb-2">
                    <span className="tm-text-gray-dark">Resolution: </span><span className="tm-text-primary">{queryData.resolution}</span>
                  </div>
                )}

                <div className="mr-4 mb-2">
                  <span className="tm-text-gray-dark">Format: </span><span className="tm-text-primary"><GetFileFormat {...queryData} /></span>
                </div>

                {queryData.video && (
                  <div>
                    <span className="tm-text-gray-dark">Duration: </span><span className="tm-text-primary">{formatDuration(duration)}</span>
                  </div>
                )}

              </div>
              <div className="mb-4">
                <h3 className="tm-text-gray-dark mb-3">License</h3>
                <p>Free for both personal and commercial use. No need to pay anything. No need to make any attribution.</p>
              </div>

              {tags && (
                <div>
                  <h3 className="tm-text-gray-dark mb-3">Tags</h3>
                  {tags.map((value) => (
                    <p key={value.slug} className="tm-text-primary mr-4 mb-2 d-inline-block">{value.name}</p>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>

        {/* 最大8件 */}
        {queryRelatedData?.length > 0 && (
          <>
            <div className="row mb-4">
              <h2 className="col-12 tm-text-primary">
                Related {relatedItemsTitle}
              </h2>
            </div>
            <GridList>
              {queryRelatedData.map((value: typeGraphqlValue) => (
                <GridListItem data={value} key={value.id} />
              ))}
            </GridList>
          </>
        )}
      </div>
    </Layout>
  )
}