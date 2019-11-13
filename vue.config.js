module.exports = {
    lintOnSave: false, //禁止eslint-loader於編譯時檢查語法
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:9000',
                //protocolRewrite: 'https',
                pathRewrite: {
                    '^/api': '/api' 
                },
            },
        }
    },
}