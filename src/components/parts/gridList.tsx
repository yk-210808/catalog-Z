import * as React from "react"
import { Link } from "gatsby"
// types
import { typeGraphqlValue } from "../../types/typeGraphql"
// utils
import { formatDate } from "../../utils/dateUtil"
// Plugins
import ReactPlayer from 'react-player'

interface GridListProps {
  children: React.ReactNode
}

interface GridListItemProps {
  data: typeGraphqlValue
}

export const GridList: React.FC<GridListProps> = ({ children }) => {
  return (
    <div className="row tm-mb-90 tm-gallery">
      {children}
    </div>
  )
}

export const GridListItem: React.FC<GridListItemProps> = ({ data }) => {
  const { id, title, date, dimension, video, resolution, featuredImage, uri } = data

  function thumb() {
    if (featuredImage) {
      return <img src={featuredImage.node.sourceUrl} alt="Image" className="img-fluid" />
    }
    if (video) {
      return <ReactPlayer url={video} className="img-fluid" height={'50%'} />
    }
  }

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5" key={id}>
      <figure className="effect-ming tm-video-item">
        {thumb()}
        <figcaption className="d-flex align-items-center justify-content-center">
          <h2>{title}</h2>
          <Link to={uri}>View more</Link>
        </figcaption>
      </figure>
      <div className="d-flex justify-content-between tm-text-gray">
        <span className="tm-text-gray-light">{formatDate(date)}</span>
        {/* <span>9,906 views</span> */}
      </div>
    </div>
  )
}