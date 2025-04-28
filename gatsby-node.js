const { resolve } = require("path");

exports.createPages = async ({ actions, graphql }) => {
  const postsPerPage = 8;

  /**
   * Photo
   */
  const { data: { allWpPhoto: { edges: photos } } } = await graphql(`
    query PhotoQuery {
      allWpPhoto (limit: 1000) {
        edges {
          node {
            id
            slug
            uri
            taxPhotos {
              nodes {
                slug
              }
            }
          }
        }
      }
    }
  `);

  // Photo Detail
  photos.map((edge) => {
    const { node } = edge;
    const { id, uri } = node;
    
    const photoTags = node.taxPhotos?.nodes;
    const tagSlugs  = photoTags.map(tag => tag.slug);

    return actions.createPage({
      component: resolve(`./src/components/photoDetail.tsx`),
      path: uri,
      context: {
        id,
        terms: tagSlugs,
        skipRelated: tagSlugs.length === 0
      }
    })
  });

  // Photo Archive
  const photoNumPages = Math.ceil(photos.length / postsPerPage);

  Array.from({ length: photoNumPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? `/` : `/pages/${i + 1}`,
      component: resolve(`./src/components/photoArchive.tsx`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: photoNumPages,
        currentPage: i + 1
      }
    })
  });

  /**
   * Video
   */
  const { data: { allWpVideo: { edges: videos } } } = await graphql(`
    query VideoQuery {
      allWpVideo (limit: 1000) {
        edges {
          node {
            id
            slug
            uri
            taxVideos {
              nodes {
                slug
              }
            }
          }
        }
      }
    }
  `);

  // Video Detail
  videos.map((edge) => {
    const { node } = edge;
    const { id, uri } = node;
    
    const videoTags = node.taxVideos?.nodes;
    const tagSlugs = videoTags.map(tag => tag.slug);

    return actions.createPage({
      component: resolve(`./src/components/videoDetail.tsx`),
      path: uri,
      context: {
        id,
        terms: tagSlugs,
        skipRelated: tagSlugs.length === 0
      }
    })
  });

  // Video Archive
  const videoNumPages = Math.ceil(videos.length / postsPerPage);

  Array.from({ length: videoNumPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? `/videos/` : `/videos/pages/${i + 1}`,
      component: resolve(`./src/components/videoArchive.tsx`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: videoNumPages,
        currentPage: i + 1
      }
    })
  });
}