/*入口脚本*/
require.config({
    baseUrl: "js/",
    paths: {
    	"jquery": "../lib/jquery/jquery-2.1.1.min",
    	"text": "../lib/requirejs/text"
    },
    waitSeconds: 15
});

require(["j_index/index"], function(index) {
    // todo
});

