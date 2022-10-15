module.exports = {
  siteMetadata: {
    title: '我的运动轨迹',
    siteUrl: 'http://www.mengzai.art',
    description: '我的运动轨迹啊！',
  },
  plugins: [
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    "gatsby-plugin-image",
      // "gatsby-source-filesystem",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/static/',
      },
    },
    {
      resolve : `gatsby-source-filesystem` ,
      options : {
        name : `image` ,
        path : './src/images',
      },
    },
    {
      resolve: 'gatsby-alias-imports',
      options: {
        rootFolder: './',
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        precision: 8,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#e1e1e1',
        theme_color: '#e1e1e1',
        display: 'standalone',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
  ],
  pathPrefix: ``, //地址前缀,如部署到github 需改此项
};
