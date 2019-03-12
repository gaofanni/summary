module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            'index.js',
            'test/*.js'
        ],
        exclude: [
        ],
        preprocessors: {
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
        plugins: [
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-chai',
        ]
    })
}