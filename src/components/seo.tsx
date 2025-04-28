import * as React from "react"
import { graphql, useStaticQuery } from 'gatsby'

interface SeoProps {
  title: string
}

const Seo: React.FC<SeoProps> = ({ title }) => {
  const siteData = useStaticQuery(graphql`
    query{
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const seo = {
    title: title + ' | ' + siteData.site.siteMetadata.title,
  }

  return (
    <>
      <title>{seo.title}</title>
    </>
  )
}

export default Seo