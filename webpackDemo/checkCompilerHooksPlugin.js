const pluginName = 'checkCompilerHooksPlugin';
module.exports = class checkCompilerHooksPlugin {
    apply(compiler) {
        //打印出entryOption执行完毕时Compiler暴露的钩子
        for (var hook of Object.keys(compiler.hooks)) {
            console.log(hook);
        }
        console.log(compiler)
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log('webpack构建开始')
        })
    }
}
