const client = require("./client");
const isProduction = process.env.NODE_ENV === "production";
// module.exports = {
//   exportPathMap: async function(defaultPathMap) {
//     const paths = await client
//       .fetch('*[_type == "post" && defined(slug)].slug.current')
//       .then(data =>
//         data.reduce(
//           (acc, slug) => ({
//             "/": { page: "/" },
//             ...acc,
//             [`/p/${slug}`]: { page: "/post", query: { slug } }
//           }),
//           defaultPathMap
//         )
//       )
//       .catch(console.error);
//     return paths;
//   }
// };

const withCSS = require("@zeit/next-css");

// module.exports = withCSS({
//   cssLoaderOptions: {
//     url: false
//   }
// });

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: isProduction ? "[hash:base64:5]" : "[name]__[local]___[hash:base64:5]",
    url: false
  },
  webpack: function(config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "[name].[ext]"
        }
      }
    });
    return config;
  }
});
