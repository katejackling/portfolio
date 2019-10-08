const client = require("./client");
const isProduction = process.env.NODE_ENV === "production";

const withCSS = require("@zeit/next-css");
const withModernizr = require("next-plugin-modernizr");

module.exports = withModernizr(
	withCSS({
		cssModules: true,
		cssLoaderOptions: {
			importLoaders: 1,
			url: false,
			localIdentName: isProduction ? "[hash:base64:5]" : "[name]__[local]"
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
		},
		exportPathMap: async function(defaultPathMap) {
			const paths = await client
				.fetch("*[slug.current].slug.current")
				.then(data =>
					data.reduce(
						(acc, slug) => ({
							"/": { page: "/" },
							...acc,
							[`/post/${slug}`]: { page: "/post/[slug]", query: { slug } }
						}),
						defaultPathMap
					)
				)
				.catch(console.error);
			return paths;
		}
	})
);
