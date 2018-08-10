var gulp = require('gulp');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var postcssPresetEnv  = require('postcss-preset-env');
var customMedia  = require('postcss-custom-media');
var postcssCustomProperties = require('postcss-custom-properties');
var minifycss = require('gulp-csso');
var minifyhtml = require('gulp-htmlmin');
var handlebars = require("gulp-compile-handlebars");

var folder = {
    src: './src/',
    build: './build/'
};

var data = { "cafes": [
    {
        "cafe-image": "img-xl-1.jpg", 
        "cafe-name": "Макдоналдс — Газетный",
        "cafe-food-name": "₽₽ • Бургеры", 
        "cafe-arrive-time": "22 - 35"
            }, 
    {
        "cafe-image": "img-xl-2.jpg", 
        "cafe-name": "DimSum & Co — ЦДМ",
        "cafe-food-name": "₽ • Японская • Китайская • Азиатская", 
        "cafe-arrive-time": "40 - 50"
    }, 
    {
        "cafe-image": "img-xl-3.jpg", 
        "cafe-name": "ДвижОК — Манежная",
        "cafe-food-name": "₽ • Американская • Европейская", 
        "cafe-arrive-time": "35 - 45"
    }, 
    {
        "cafe-image": "img-xl-4.jpg", 
        "cafe-name": "НЯ — NHA",
        "cafe-food-name": "₽₽ • Вьетнамская", 
        "cafe-arrive-time": "30 - 40"
    }, 
    {
        "cafe-image": "img-xl-5.jpg", 
        "cafe-name": "Точка Дзы — Цветной",
        "cafe-food-name": "₽₽ • Вьетнамская", 
        "cafe-arrive-time": "40 - 50"
    }, 
    {
        "cafe-image": "img-xl-6.jpg", 
        "cafe-name": "Cinnabon",
        "cafe-food-name": "₽ • Выпечка • Десерты • Капкейки", 
        "cafe-arrive-time": "25 - 35"
    }, 
    {
        "cafe-image": "img-xl-7.jpg", 
        "cafe-name": "PIZZELOVE",
        "cafe-food-name": "₽₽ • Пицца", 
        "cafe-arrive-time": "15 - 25"
    }, 
    {
        "cafe-image": "img-xl-8.jpg", 
        "cafe-name": "Zю кафе — Тверская",
        "cafe-food-name": "₽₽ • Японская", 
        "cafe-arrive-time": "25 - 35"
    }, 
    {
        "cafe-image": "img-xl-9.jpg", 
        "cafe-name": "Bar BQ Cafe — Манежная",
        "cafe-food-name": "₽₽₽ • Европейская", 
        "cafe-arrive-time": "30 - 40"
    }
          ]
};

var food = { "cafe-food": 
    [
        {
            "cafe-food-desc": "Сельдь на бородинском хлебе",
            "cafe-food-desc2": "С яйцом и огурцом",
            "cafe-food-price": "240",
            "cafe-food-img": "./images/f1.png",
            "cafe-food-img-name": "f1"
        },
        {
            "cafe-food-desc": "Соленья ассорти",
            "cafe-food-price": "320",
            "cafe-food-img": "./images/f2.jpg",
            "cafe-food-img-name": "f2"
        },
        {
            "cafe-food-desc": "Грибы маринованные",
            "cafe-food-price": "300",
            "cafe-food-img": "./images/f3.png",
            "cafe-food-img-name": "f3"
        },
        {
            "cafe-food-desc": "Сало домашнее с горчицей",
            "cafe-food-price": "320",
            "cafe-food-img": "./images/f4.png",
            "cafe-food-img-name": "f4"
        },
        {
            "cafe-food-desc": "Малосольная семга",
            "cafe-food-price": "390",
            "cafe-food-img": "./images/f5.png",
            "cafe-food-img-name": "f5"
        },
        {
            "cafe-food-desc": "Язык говяжий с хреном",
            "cafe-food-price": "350",
            "cafe-food-img": "./images/f6.png",
            "cafe-food-img-name": "f6"
        }
    ]
};

gulp.task('images', function() {
    var out = folder.build + 'images/';
    return gulp.src(folder.src + 'images/**/*')
        .pipe(newer(out))
        .pipe(imagemin({optimizationLevel: 5}).on('error', function(e) {console.log(e)}))
        .pipe(gulp.dest(out));
});

gulp.task('styles', function () {
    var out = folder.build;
    return gulp.src(folder.src + '*.css')
        .pipe(postcss([customMedia (), postcssPresetEnv(), postcssCustomProperties(), autoprefixer()]))
        .pipe(minifycss())
        .pipe(gulp.dest(out));
});

gulp.task('html-index', function() {
    var out = folder.build;
    return gulp.src(folder.src + 'index.html')
        .pipe(minifyhtml({collapseWhitespace: true}))
        .pipe(gulp.dest(out));
});

gulp.task('html-cafe', function() {
    var out = folder.build;
    return gulp.src(folder.src + 'UberEats_Cafe.html')
        .pipe(handlebars(food))
        .pipe(minifyhtml({collapseWhitespace: true}))
        .pipe(gulp.dest(out));
});

gulp.task('html-main', function() {
    var out = folder.build;
    return gulp.src(folder.src + 'UberEats_Main.html')
        .pipe(handlebars(data))
        .pipe(minifyhtml({collapseWhitespace: true}))
        .pipe(gulp.dest(out));
});

gulp.task("html", ["html-main", "html-cafe", "html-index"]);
gulp.task("build", ["images", "styles", "html"]);