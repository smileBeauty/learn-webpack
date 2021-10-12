const glob = require('glob');
const path = require('path');
let chunckNameArr = [];

const getEntry = () => {
    let entry = {};
    const filePathArr = glob.sync(path.resolve(__dirname, '../template/**.html'));
    filePathArr.forEach(filePath => {
        const chunckName = filePath.replace(/(.*\/)*([^.]+).*/ig, "$2");
        chunckNameArr.push(chunckName);
        entry[chunckName] = path.resolve(__dirname, `../src/${chunckName}/${chunckName}.js`);
    });
    return entry;
};

const getHtmlTemplate = (HtmlWebpackPlugin) => {
    return chunckNameArr.map(chunckName => {
        return new HtmlWebpackPlugin({
            filename: `${chunckName}.html`,
            template: path.resolve(__dirname, `../template/${chunckName}.html`),
            inject: 'body',
            chunks: [chunckName]
        });
    });
};

const getRewritePaths = (defaultPath = 'index') => {
    return [
        {
            from: '/',
            to: `/${defaultPath}.html`
        },
        ...chunckNameArr.map(chunckName => {
            return {
                from: `/${chunckName}`,
                to: `/${chunckName}.html`
            }
        })
    ];
};

module.exports = {
    getEntry,
    getHtmlTemplate,
    getRewritePaths
};