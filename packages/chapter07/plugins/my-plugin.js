class Myplugin1 {
    constructor(options = {}) {
        if (!options.name) {
            throw new Error('Myplugin1 need option name');
        }
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.done.tap('Myplugin1', () => {
            console.log('Myplugin1', this.options);
        });
    }
}

module.exports = Myplugin1;