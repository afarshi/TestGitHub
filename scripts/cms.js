
function reloadTree() 
{
    __doPostBack(lb_reload,'');
    
}

function setMenuItemsState(menuItems, treeNode)
{ 
    var name = treeNode.get_text();
    var page = (name.indexOf(".") > -1);
    var root = (treeNode.get_level() == 0);
    
    for (var i=0; i<menuItems.get_count(); i++)
    {
        
        var menuItem = menuItems.getItem(i);
               
        switch(menuItem.get_value())
        {
            case "DeleteFolder":
                menuItem.set_enabled(!page && !root);
                if (!page && !root) menuItem.set_text("Delete '" + name + "'");
                else menuItem.set_text("Delete folder");
                break;
            case "AddFolder":
                menuItem.set_enabled(!page);
                break;
            case "AddPage":
                menuItem.set_enabled(!page);
                break;
            case "DeletePage":
                menuItem.set_enabled(page);
                if (page) menuItem.set_text("Delete '" + name + "'");
                else menuItem.set_text("Delete page");
                break;
            case "CopyLink":
                menuItem.set_enabled(page);
                menuItem.set_text("Copy link to clipboard");
                break;
        }
    }
}



function contextClean(sender, args)
{
    var treeNode = args.get_node();
    treeNode.set_selected(true);
    setMenuItemsState(args.get_menu().get_items(), treeNode);
}

function clickNode(sender, args)
{
    var link = args.get_node().get_value();
    var page = (link.indexOf(".aspx") > -1);
    
    if (page) {
        loadPage(link);
    }

}

function loadPage(link) {
    document.getElementById(pl_edit).style.display = 'none';
    document.getElementById('hl_alt_text').style.display = 'none';   
    document.getElementById('if_cms').style.display = 'block';
    
    var chars = "abcdefghiklmnopqrstuvwxyz";
	    
	var randomstring = '';
	for (var i=0; i<8; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
    
    document.getElementById('if_cms').src = link + "?" + randomstring;
}

function contextNode(sender, args)
{
    
    var menuItem = args.get_menuItem();
    var treeNode = args.get_node();
    var link = treeNode.get_value();
    
    document.getElementById('hf_path').value = link;
    
        
    switch(menuItem.get_value())
    {
        case "AddFolder": 
                                
            document.getElementById(pl_edit).style.display = 'block';
            document.getElementById('hl_alt_text').style.display = 'block';   
            document.getElementById('if_cms').style.display = 'none';
            document.getElementById('if_cms').src = '';
       
            __doPostBack(lb_add_folder,'');
            
            break;
        case "DeleteFolder":
                          
            if (confirm('Are you sure you want to delete this folder? This cannot be undone.')) {  
                __doPostBack(lb_delete_folder,'');
            }
            
            break;
        case "DeletePage":
            
            if (confirm('Are you sure you want to delete this page? This cannot be undone.')) {
                __doPostBack(lb_delete_page,'');
            }
            
            break;
        case "AddPage":
                                
            document.getElementById(pl_edit).style.display = 'block';
            document.getElementById('hl_alt_text').style.display = 'block';   
            document.getElementById('if_cms').style.display = 'none';
            document.getElementById('if_cms').src = '';
                                     
            __doPostBack(lb_add_page,'');
            
            break;
        case "CopyLink":
                          
            link = link.replace("..", "");
            copyToClipboard(link);
            alert("The link '" + link + "' has been copied to your clipboard. Paste this link into the Rich Text Editor link dialog");
           
            break;
    }
}

function getLink(treeNode) 
{
    var path = getPath(treeNode);
    return url.substring(0, url.indexOf(domain)) + path;
}

function getPath(treeNode) 
{
    var path = treeNode.get_attributes().getAttribute("Name");
    
    while(treeNode.get_value() != "0") {
        treeNode = treeNode.get_parent();
        
        if ( treeNode.get_value() != "0")       
            path = treeNode.get_attributes().getAttribute("Name") + '/' + path;
        else
            path = treeNode.get_text() + '/' + path;
    }
    
    return path.substring(path.indexOf(domain));
}