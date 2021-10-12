module.exports = function (content, map, meta) {
    console.log('my-loader2');
    // this.callback(null, content, map, meta);
    return content;
}