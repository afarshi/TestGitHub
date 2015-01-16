//JavaScript code included at jsUpdateProgress.js file
Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(beginReq);
Sys.WebForms.PageRequestManager.getInstance().add_endRequest(endReq);

var div_progress = '#popup-progress';
var str_progress = 'Please wait: Processing...';
var to_progress;
function beginReq(sender, args) {
    to_progress = setTimeout("startProgress()", 1000);
}

function startProgress() {
    new Boxy(div_progress, { title: str_progress, modal: true, closeable: false });
}

function endReq(sender, args) {

    clearTimeout(to_progress);
    if (window.top.Boxy.get(div_progress) != null)
        window.top.Boxy.get(div_progress).hide();
    str_progress = 'Please wait: Processing...';


    var Error = args.get_error();
    if (Error != null)
        vAlert(Error.message);

    args.set_errorHandled(true);

}

function setupProgress(str) {
    str_progress = str;
}