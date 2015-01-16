/// <reference path="jquery-1.3.2.min.js" />
// used often
function confirmDelete() {
    if (confirm("Are you sure you want to remove this record permanently? Doing so will remove all references to this record from the system. Note that this action cannot be undone.") == true)
        return true;
    else
        return false;
}

// used for triggering certain buttons on 'enter' press
function clickButton(key_1, key_2, btn) {
    if ((key_1 == 13) || (key_2 == 13)) {
        document.getElementById(btn).click();
        return false;
    }
    else return true;
}
function clickSubmitControl(e, btn) {
    e = e || window.event;
    var key = e.keyCode ? e.keyCode : e.charCodesetupSc

    if (key == 13) {
        __doPostBack(btn, '');
        return false;
    }
    else return true;
}


// for creating a cookie 
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

// for reading from a cookie 
function readCookie(name) {
    var nameEQ = name + "=";

    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

//generateRandomString
function randomString(length, numeric) {
    var chars = "abcdefghiklmnopqrstuvwxyz";
    if (numeric)
        chars = "0123456789";

    var randomstring = '';
    for (var i = 0; i < length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }

    return randomstring;
}


// copy to clipboard

function copyToClipboard(Text2copy) {
    if (window.clipboardData) {
        window.clipboardData.setData("Text", Text2copy);
    } else {
        var flashcopier = 'flashcopier';
        if (!document.getElementById(flashcopier)) {
            var divholder = document.createElement('div');
            divholder.id = flashcopier;
            document.body.appendChild(divholder);
        }
        document.getElementById(flashcopier).innerHTML = '';
        var divinfo = '<embed src="https://secure.virtualatlantic.com/common/scripts/clipboard.swf" FlashVars="clipboard=' + escape(Text2copy) + '" width="0" height="0" type="application/x-shockwave-flash"></embed>';
        document.getElementById(flashcopier).innerHTML = divinfo;
    }
}

// for setting up greyed out Textboxes ie. search and email newsletter signup

var j_default_email = "user@domain.com";
var j_default_search = "Enter Keywords";
var j_default_color = "#aaaaaa";
var j_edit_color = "#000000";

function setupDynamicInputs(_selector, _default) {


    if ($(_selector) != null) {
        $(_selector).val(_default);
        $(_selector).attr('default', _default);
        $(_selector).css('color', j_default_color);

        $(_selector).focus(function() {

            $(this).css('color', j_edit_color);
            if ($(this).val() == $(this).attr('default')) {
                $(this).val('');
            }
        });

        $(_selector).blur(function() {

            if ($(this).val() == '') {
                $(this).css('color', j_default_color);
                $(this).val($(this).attr('default'));
            }
        });
    }
}

// specifically setup search functionality
function setupSearch() {

    if ($('.j_search') != null) {
        setupDynamicInputs('.j_search', j_default_search);

        // check for keypress enter - make sure no form on the page is submitted because of it
        $(".j_search").keypress(function(e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                document.location.href = $(".j_search_submit").attr('href');
                return false;
            }
        });

        // operation when search is submitted
        $(".j_search_submit").click(function() {

            if ($(".j_search").val() != '' && $(".j_search").val() != j_default_search) { // ie. not blank

                var name = $(".j_search_submit").attr('name');
                __doPostBack(name, '');

            }
            else
                return false;
        });
    }
}

function setupLockedInputs() {

    if ($('.j_locked') != null) {
        $('.j_locked').attr('disabled', true);
        $('.j_lock').click(function() {
            if ($('.j_lock').css('background-image').indexOf('lock.png') > -1) {
                if (confirm('Are you sure you want to unlock this field(s) for editing. Changing this field will cause renaming of elements (eg. page urls) which may negatively affect your search engine placement. After launch, only change this field if absolutely necessary.')) {
                    $('.j_locked').removeAttr('disabled');
                    $('.j_lock').css('background-image', $('.j_lock').css('background-image').replace('lock.png', 'lock_open.png'));
                }
            }
            else {

                $('.j_locked').attr('disabled', true);
                $('.j_lock').css('background-image', $('.j_lock').css('background-image').replace('lock_open.png', 'lock.png'));
            }
        });
    }
}


function setupSameHeightElements(identifier) {

    if ($(identifier) != null) {
        var tallest = 0;

        if (typeof ($(identifier).css('min-height')) != 'undefined') {
            if ($(identifier).css('min-height').indexOf('px') > -1)
                $(identifier).css('min-height').replace('px', '');
        }

        $(identifier).each(function() {

            if (this.offsetHeight > tallest)
                tallest = this.offsetHeight;

        });
        $(identifier).css('height', tallest);
    }

}

// used throughout for generating the flash object
function generateFlash(ref, movie, width, height, flashvars, container) {

    str = ('<object classID="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + width + '" height="' + height + '" ID="' + ref + '" name="' + ref + '" align="middle" title="' + ref + '" allowFullScreen="true" wmode="transparent">\n');
    str += ('<param name="allowScriptAccess" value="sameDomain" />\n');
    str += ('<param name="movie" value="' + movie + '">\n');
    str += ('<param name="flashvars" value="' + flashvars + '">\n');
    str += ('<param name="quality" value="high" />\n');
    str += ('<param name="wmode" value="transparent" />\n');
    str += ('<embed src="' + movie + '" flashvars="' + flashvars + '" quality="high" width="' + width + '" height="' + height + '" name="' + ref + '" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashvid_player" allowFullScreen="true" wmode="transparent" />\n');
    str += ('</object>\n');

    if (container != null && container != '') {
        document.getElementById(container).style.display = 'block';
        document.getElementById(container).innerHTML = str;
    }
    else
        document.write(str);
}

function jFlash(selector, width, height, flashvars) {
    $(selector).each(function() {
        movie = $(this).attr('href');
        if (movie != "#") {
            ref = movie.substring(0, movie.lastIndexOf("."));
            ref = ref.substring(ref.lastIndexOf("/") + 1);

            str = ('<object classID="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' + width + '" height="' + height + '" ID="' + ref + '" align="middle" title="' + ref + '" allowFullScreen="true" wmode="transparent">\n');
            str += ('<param name="allowScriptAccess" value="always" />\n');
            str += ('<param name="movie" value="' + movie + '">\n');
            str += ('<param name="flashvars" value="' + flashvars + '">\n');
            str += ('<param name="quality" value="high" />\n');
            str += ('<param name="wmode" value="transparent" />\n');
            str += ('<embed src="' + movie + '" flashvars="' + flashvars + '" quality="high" width="' + width + '" height="' + height + '" name="' + ref + '" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashvid_player" allowFullScreen="true" wmode="transparent" />\n');
            str += ('</object>\n');

            $(this).attr('href', '#');
            $(this).html(str);
        }
    });
}

function setupDialog(selector, title, _width, _height) {
    $(selector).dialog({
        bgiframe: true,
        width: _width,
        height: _height,
        modal: true,
        autoOpen: false,
        resizable: false,
        position: ['center', 32],
        open: function() {
            $(this).parent().appendTo(jQuery("form:first"));
        }
    });

    $(selector).dialog('open');
    $(selector).dialog('option', 'title', title);
}

function setupiFrame(selector, title, url) {
    var sel_ifr = selector + ' iframe';
    var _width = $(sel_ifr).attr('width') * 1 + 24;
    var _height = $(sel_ifr).attr('height') * 1 + 46;

    setupDialog(selector, title, _width, _height);
    $(selector + ' iframe').attr('src', url);
}



function setCheckBoxes(obj, selector) {
    $(selector + ' input, ' + selector).attr('checked', $(obj).is(':checked'));
}

// things to do when page is loaded
$(document).ready(function() {
    setupPage();
});

function setupPage() {

    if($().datepicker)
        $('.datepicker').datepicker();
    jQuery('.time-picker').each(function() {
        var dtid = jQuery(this).attr('id');
        jQuery('#' + dtid).timePicker({ endTime: new Date(0, 0, 0, 23, 55, 0), step: 5 });
    });
    if ($().mask) {
        $(".datepicker").mask("99/99/9999");
        $(".tel").mask("(999) 999-9999");
        $(".zip").mask("99999");
        $(".num").mask("9?99999");
        $(".dec").mask("9?99999?.99");
        $(".inch").mask("9?999");
    }
    if ($().pager) 
        setupPager();

    if ($().tabs)
        $('.tabs_std').tabs();


    setupSearch();
    setupLockedInputs();
}

function setupCheckBacks() {
    $('.check-back').change(function() {
        $(':button.check-back, a.check-back').click(function() {
            return confirm('Are you sure you want to go back? If you haven\'t already saved you will lose any changes you\'ve made.', this);
        });
    });
};

var share_url;
function setupShares() {
    $("a[sharewith]").each(function() {
        var rel = $(this).attr("sharewith");
        var url = encodeURIComponent($(this).attr("href"));
        var title = encodeURIComponent($("title:first").html());
        rel = rel.replace("{url}", url);
        rel = rel.replace("{title}", title);
        $(this).attr("url", rel);
        $(this).attr("href", "#");
        $(this).attr("title", 'Share this on ' + rel.split('/')[2]);


        if (rel.indexOf('twitter') > -1 || rel.indexOf('facebook') > -1) {
            $(this).attr("href", rel);
            $(this).attr("target", "_blank");
        }
        else {
            $(this).click(function() {
                $('#ifr').attr('width', 740).attr('height', 480);

                share_url = $(this).attr("url");

                new Boxy('#popup-ifr', { modal: true, title: 'Share this page', closeable: true, afterShow: function() { setTimeout("$('#ifr').attr('src', share_url)", 10); } });

                return false;
            });
        }
    });
}


function setupMenu(selector) {

    $(selector).find('a > span').css('padding-left', '0px');
    $(selector).find('a > span').css('padding-right', '0px');
    
    
    var count = $(selector).children().size() * 2;

    var outer = $(selector).parent().width();
    var inner = $(selector).width();

    var diff = outer - inner;
    var also = diff % count;
    var padding = (diff - (also)) / count;
    var first = padding + ((also + (also / 2)) / 2) - 9;
    var last = padding + ((also - (also / 2)) / 2) - 9;
    
    

    $(selector).find('a > span').css('padding-left', padding + 'px');
    $(selector).find('a > span').css('padding-right', padding + 'px');

    $(selector).find('a > span:first').css('padding-left', first + 'px');
    $(selector).find('a > span:last').css('padding-left', last + 'px');

}


/* Only to be used with a links or LinkButtons */

function vAlert(str, fn) {
    //you can pass a function to the method if you want to do anything after clicking 'OK'
    Boxy.ask(str, { 'yes': 'OK' }, function(r) { if (fn != null) fn(); }, { title: 'Alert Message' });
    return false;
}

function vConfirm(str, action) {

    Boxy.ask(str, { 'yes': 'OK', 'no': 'Cancel' }, function(r) {
        if (r == 'yes') {
            
            str_action = action.toString()
            
            if (str_action.indexOf('javascript:') > -1)
            {
                str_action = str_action.replace('javascript:', '');
                setTimeout(URLDecode(str_action), 1);
            }
            else
                document.location.href = (str_action);
                
        }
    }, { title: 'Please confirm your action', afterShow: function() { $('.boxy-inner ').focus(); } });
    return false;
}


function vConfirmAlt(str, action, alternate) {

    Boxy.ask(str, { 'yes': 'Yes', 'no': 'No', 'cancel': 'Cancel' }, function(r) {
        if (r != 'cancel') {

            if (r == 'no')
                str_action = $(alternate).attr('href')
            else
                str_action = action.toString();

            if (str_action.indexOf('javascript:') > -1) {

                str_action = str_action.replace('javascript:', '');
                setTimeout(URLDecode(str_action), 1);
            }
            else
                document.location.href = (str_action);


        }
    }, { title: 'Please confirm your action', afterShow: function() { $('.boxy-inner ').focus(); } });
    return false;
}

function vClosePopup() {
    if (window.top.Boxy.get('#popup-ifr') != null) 
        window.top.Boxy.get('#popup-ifr').hide();
}

function checkResizeWidth(width) 
{
    if (width > $(window).width() - 80)
        width = $(window).width() - 80;
    return width;
}

function checkResizeHeight(height) {
    if (height > $(window).height() - 80)
        height = $(window).height() - 80;
    return height;
}

// For tabs
(function($) {
    $.fn.tabs = function() {

        return this.each(function() {

            tabs = $(this);
            rel = tabs.attr('rel');
            multiple = (typeof (rel) != 'undefined');

            if (multiple)
                tabs = $('div[rel=' + rel + ']');

            multiple = tabs.length > 1;

            already = false;
            tabs.find('ul.tabs li').each(function() {
                if ($(this).hasClass('on'))
                    already = true;
            });

            if (!already) {

                $(this).find('div.pane').hide();

                tabs.each(function() {
                    $($(this).find('div.pane')[0]).show();
                    $($(this).find('ul.tabs li')[0]).addClass('on');
                });
            }

            tabs.find('ul.tabs li').click(function() {
                tabs = $(this).parent().parent();

                if (multiple)
                    tabs = $('div[rel=' + rel + ']');

                i = $(this).parent().children().index($(this));

                tabs.find('ul.tabs li').removeClass('on');
                tabs.find('div.pane').hide();
                tabs.each(function() {
                    $($(this).find('div.pane')[i]).show();
                    $($(this).find('ul.tabs li')[i]).addClass('on');
                });

                return false;

            });
        });
    };
})(jQuery);


function URLEncode(clearString) {
    var output = '';
    var x = 0;
    clearString = clearString.toString();
    var regex = /(^[a-zA-Z0-9_.]*)/;
    while (x < clearString.length) {
        var match = regex.exec(clearString.substr(x));
        if (match != null && match.length > 1 && match[1] != '') {
            output += match[1];
            x += match[1].length;
        } else {
            if (clearString[x] == ' ')
                output += '+';
            else {
                var charCode = clearString.charCodeAt(x);
                var hexVal = charCode.toString(16);
                output += '%' + (hexVal.length < 2 ? '0' : '') + hexVal.toUpperCase();
            }
            x++;
        }
    }
    return output;
}

function URLDecode(encodedString) {
    var output = encodedString;
    var binVal, thisString;
    var myregexp = /(%[^%]{2})/;
    while ((match = myregexp.exec(output)) != null
             && match.length > 1
             && match[1] != '') {
        binVal = parseInt(match[1].substr(1), 16);
        thisString = String.fromCharCode(binVal);
        output = output.replace(match[1], thisString);
    }
    return output;
}

/// pager controls for use with jquery.pager.js
var page_height = 0;
var paged_height = 0;
var pages = 1;
var page_last = 0;
var pager_y = 0;

function setupPager() {

    if ($('.paged-gallery').length > 0) {

        selectPage(1);
    }
}


function selectPage(page) {

    page_height = $('.paged-gallery').height();
    paged_height = $('.paged-inner').height();

    pages = (paged_height + (paged_height % page_height)) / page_height;

    $(".pager").pager({ pagenumber: page, pagecount: pages, buttonClickCallback: selectPage });
    var offset = ((page - 1) * page_height);
    
    pager_y = $('.paged-inner').position().top;
    
    $('.paged-inner').css('margin-top', '-' + offset + 'px');

    setupPagedFlash();
}

function setupPagedFlash() {
    num = 0;
    $('.flash').each(function() {
        offset = parseInt($(this).parent().position().top);

        diff = parseInt(offset) - parseInt(pager_y);
        if (diff < page_height && diff > -page_height) {
            jFlash(this, 100, 100, '');
            num++;
        }

    });
}

// uploadify upload functionality in master page

var uploadify_media_ids;
var uploadify_errors;
var uploadify_json = '';
var fnUploadifyTrigger;

function prepareUploadVars() {
    uploadify_media_ids = new Array();
    uploadify_errors = new Array();
}
function refreshUploadTitle(data) {
    $('#uploadify-title').html(data.fileCount + ' file(s) selected for upload');
}
function confirmUploadComplete() {

    if (uploadify_media_ids.length > 0) {

        if (fnUploadifyTrigger != null) {

            uploadify_json = JSON.stringify({ 'MediaIDs': uploadify_media_ids, 'Errors': uploadify_errors });

            fnUploadifyTrigger();

        }
        else
            vAlert(uploadify_media_ids.length + " successfully uploaded.");

        Boxy.get('#popup-upload').hide();
    }
    else if (uploadify_errors.length > 0)
        vAlert(uploadify_errors.length + " file(s) failed on upload." + uploadify_errors[0]);


}
// setupUpload - Max number of files, limit of each filesize, extensions allowed: *.jpg;*.gif, description of files allowed: Image Files, trigger function to be called after completion of successful uploads

function setupUpload(num, limit, ext, desc, data, fn) {

    $('#uploadify-container').html('<div ID="uploadify-queue"></div><hr/><span ID="uploadify"></span>');
    
    if (num > 1) {
        if (num > 4)
            $('#uploadify-queue').height(250);
        else
            $('#uploadify-queue').height(57 * num);
    }
    
    new Boxy('#popup-upload', { title: '<span ID="uploadify-title">Select file(s) to upload</span>', modal: true });

    prepareUploadVars();
    
    limit = limit * 1000000;
    fnUploadifyTrigger = fn;

    $('#uploadify').uploadify({
        uploader: '../scripts/uploadify.swf',
        script: '../media/upload.ashx',
        scriptData: data,
        cancelImg: '../images/common/cancel.png',
        queueID: 'uploadify-queue',
        fileExt: ext,
        fileDesc: desc,
        auto: false,
        multi: (num > 1),
        queueSizeLimit: num,
        sizeLimit: limit,
        wmode: 'transparent',
        buttonImg: '../images/common/browse-files.jpg',
        width: 107,
        height: 20,
        onSelectOnce: function(evt, data) { prepareUploadVars(); refreshUploadTitle(data); },
        onCancel: function(evt, id, obj, data) { refreshUploadTitle(data); },
        onClearQueue: function(evt, data) { refreshUploadTitle(data); },
        onComplete: function(evt, id, obj, response, data) {

            var isnum = /^\d+$/.test(response);
            if (isnum) {
                uploadify_media_ids[uploadify_media_ids.length] = response;
            }
            else
                uploadify_errors[uploadify_errors.length] = data.name + ': ' + response;

            $('#uploadify-title').html(uploadify_media_ids.length + ' of ' + (uploadify_media_ids.length + data.fileCount) + ' files uploaded successfully');

            if (data.fileCount == 0)
                confirmUploadComplete();
        },
        onError: function(evt, id, obj, err) { vAlert("Error: " + err.type + ' ' + err.info); }
    });
    $(function() {
        InitializeValidation();
    });

    function InitializeValidation() {
        var validator = $("#MasterPageForm1").bind("invalid-form.validate", function() { }).validate({
            errorElement: "em",
            errorPlacement: function(error, element) {
                error.appendTo(element.parent("td").next("td"));
            },
            success: function(label) {
                label.Text("ok!").addClass("success");
            }
        });
    }


}
