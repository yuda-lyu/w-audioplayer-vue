module.exports = {
    lintOnSave: false, //禁止eslint-loader於編譯時檢查語法
    devServer: {
        proxy: {
            '/test-mp3': {
                target: 'http://localhost:8081',
                pathRewrite: {
                    '^/test-mp3': '/' 
                },
            },
        }
    },
}