const PATH_NAME = window.location.pathname;

function getJs(url) {
    var script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
}
const ENTRY = {
    index : function() {
        getJs('../static/assets/js/index.js');
    },
    list : function() {
        getJs('../static/assets/js/list.js');        
    }
};


if ( PATH_NAME.indexOf('/html/index.html') != -1 ) {
    ENTRY.index();
}
if ( PATH_NAME.indexOf('/html/list.html') != -1 ) {
    ENTRY.list();
}