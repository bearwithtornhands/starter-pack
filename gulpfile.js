const gulp = require('gulp');
// const gulpif = require('gulp-if');
const rigger = require('gulp-rigger');
// const uglify = require('gulp-uglify');
// const autoprefixer = require('autoprefixer');
const cssNano = require('cssnano');
const connect = require('gulp-connect');
const del = require('del');
const mqpacker = require('css-mqpacker');
// const stylelint = require('gulp-stylelint');
const postcss = require('gulp-postcss');
const uncss = require('postcss-uncss');
const normalize = require('postcss-normalize');
const presetEnv = require('postcss-preset-env');
const combineSelectors = require('postcss-combine-duplicated-selectors');
const utils = require('postcss-utilities');
const cssImport = require('postcss-import');
const cssNested = require('postcss-nested');
const hexrgba = require('postcss-hexrgba');
const cssEach = require('postcss-each');
const cssApply = require('postcss-apply');
const iconfont = require('gulp-iconfont');
const extractMediaQuery = require('postcss-extract-media-query');
const rename = require('gulp-rename');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const consolidate = require('gulp-consolidate');
const plumber = require('gulp-plumber');
const webpackStream = require('webpack-stream');
const critical = require('critical');

let isProd = false;

const path = {
	input: {
		html: 'src/html/*.html',
		css: 'src/css/*.css',
		js: 'src/js/*.js',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*',
		icons: 'src/icons/*.svg'
	},
	output: {
		html: 'dist/',
		css: 'dist/assets/',
		js: 'dist/assets/',
		img: 'dist/img/',
		fonts: 'dist/fonts/',
		icons: 'dist/fonts/icons/'
	},
	watch: {
		html: 'src/html/**/*.html',
		js: 'src/js/**/*.js',
		css: 'src/css/**/*.css',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*',
		icons: 'src/icons/**/*.svg'
	},
	plugins: {
		del: 'dist/**',
		uncss: {
			html: 'src/html/**/*.html',
			ignore: [
				'!src/html/includes/head.html',
				'!src/html/includes/scripts.html'
			]
		},
		stylelint: {
			css: 'src/css/**/*.css',
			ignore: ['!src/css/templates/*.css']
		},
		iconFont: {
			css: 'src/css/startkit/'
		},
		critical: {
			html: 'dist/*.html'
		}
	}
};

const ccsOptions = {
	uncss: {
		html: [path.plugins.uncss.html, ...path.plugins.uncss.ignore],
		ignore: [/swiper/]
	},
	preset: {
		stage: 0
	},
	extractMediaQuery: {
		output: {
			path: path.output.css,
			name: '[name]-[query].[ext]'
		}
	}
};

function getWebpackConfig() {
	const mode = isProd ? 'production' : 'development';

	return {
		mode,
		devtool: 'source-map',
		output: {
			filename: 'main.js'
		},
		module: {
			rules: [
				{
					test: /\.(js)$/,
					exclude: /(node_modules)/,
					loader: 'babel-loader',
					query: {
						presets: ['@babel/env'],
						plugins: ['@babel/plugin-proposal-class-properties']
					}
				}
			]
		},
		externals: {
			jquery: 'jQuery'
		}
	};
}

function html(cb) {
	gulp
		.src(path.input.html)
		.pipe(plumber())
		.pipe(rigger())
		.pipe(gulp.dest(path.output.html))
		.pipe(connect.reload());

	cb();
}

function css(cb) {
	gulp
		.src(path.input.css)
		.pipe(plumber())
		.pipe(
			postcss([
				cssImport,
				cssApply,
				uncss(ccsOptions.uncss),
				cssEach,
				cssNested,
				presetEnv(ccsOptions.preset),
				normalize,
				utils,
				hexrgba,
				combineSelectors,
				mqpacker,
				cssNano,
				extractMediaQuery(ccsOptions.extractMediaQuery)
			])
		)
		// .pipe(
		// 	stylelint({
		// 		reporters: [{ formatter: 'string', console: true }]
		// 	})
		// )
		.pipe(gulp.dest(path.output.css))
		.pipe(connect.reload());

	cb();
}

function criticalCSS(cb) {
	// gulp.src('dist/*.html').pipe();

	critical.generate({
		base: path.output.html,
		src: './index.html',
		dest: './assets/critical.css',
		css: [
			'dist/assets/style.css',
			'dist/assets/style-min-width-768-px.css',
			'dist/assets/style-min-width-1024-px.css'
		],
		// inline: true,
		extract: false,
		minify: true,
		dimensions: [
			{
				width: 320,
				height: 500
			},
			{
				width: 768,
				height: 500
			},
			{
				width: 1280,
				height: 500
			}
		]
	});

	cb();
}

function js(cb) {
	gulp
		.src(path.input.js)
		.pipe(plumber())
		.pipe(webpackStream(getWebpackConfig()))
		// .pipe(gulpif(isProd, uglify()))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(path.output.js))
		.pipe(connect.reload());

	cb();
}

function images(cb) {
	gulp
		.src(path.input.img)
		.pipe(newer(path.input.img))
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.jpegtran({ progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [
						{
							removeViewBox: false,
							collapseGroups: true,
							removeDimensions: true
						}
					]
				})
			])
		)
		.pipe(gulp.dest(path.output.img))
		.pipe(connect.reload());

	cb();
}

function fonts(cb) {
	gulp
		.src(path.input.fonts)
		.pipe(gulp.dest(path.output.fonts))
		.pipe(connect.reload());

	cb();
}

function clean(cb) {
	del(path.plugins.del);
	cb();
}

function mapGlyphs(glyph) {
	return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) };
}

function iconFont(cb) {
	const fontName = 'iconfont';
	const className = 'i';

	gulp
		.src(path.input.icons)
		.pipe(plumber())
		.pipe(
			iconfont({
				fontName,
				prependUnicode: false,
				formats: ['ttf', 'eot', 'woff', 'woff2'],
				normalize: true,
				fontHeight: 1001
			})
		)
		.on('glyphs', glyphs => {
			const iconFontCSSOptions = {
				fontName,
				className,
				fontPath: '../fonts/icons/',
				glyphs: glyphs.map(mapGlyphs)
			};

			gulp
				.src('./src/css/templates/foundation-style.css')
				.pipe(plumber())
				.pipe(consolidate('lodash', iconFontCSSOptions))
				.pipe(rename({ basename: fontName, extname: '.css' }))
				.pipe(gulp.dest(path.plugins.iconFont.css))
				.on('end', () => {
					cb();
				});
		})
		.pipe(gulp.dest(path.output.icons));
}

function watchFiles(cb) {
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.css, css);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.img, images);
	gulp.watch(path.watch.fonts, fonts);
	gulp.watch(path.watch.icons, styles);

	cb();
}

function connectServer(cb) {
	connect.server({
		root: './dist/',
		port: 9999,
		livereload: true
	});

	cb();
}

function switchToProd(cb) {
	isProd = true;

	cb();
}

const styles = gulp.series(iconFont, css);

const build = gulp.parallel(html, styles, js, images, fonts);
const server = gulp.parallel(watchFiles, connectServer);

const dev = gulp.series(build, server);
const prod = gulp.series(switchToProd, build);

exports.criticalCSS = criticalCSS;
exports.js = js;
exports.styles = styles;
exports.clean = clean;
exports.default = dev;
exports.prod = prod;
