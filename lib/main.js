exports.main = function() {
    var currentUrl = '';
    var currentTitle = '';
    var currentSelection = '';
    
    var self = require("self");

    var selection = require("selection");

    var selectedText = '';

    function selectionChanged(event){
        selectedText = selection.text;
    }

    selection.on('select', selectionChanged);
    
    // Create widget that will show panel on click
    require("widget").Widget({
        id: "kippt",
        label: "Kippt it",
        contentURL: self.data.url("icon.png"),
        onClick: function(){
            var tabs = require("tabs");
            var currentUrl = tabs.activeTab.url;
            var currentTitle = tabs.activeTab.title;
            if (!selectedText) selectedText = '';
            
            // Create panel for kippt
            var kipptPanel = require("panel").Panel({
                width:430,
                height:240,
                contentURL : "https://kippt.com/extensions/new/?"
                            +"url="+encodeURIComponent(currentUrl)
                            +"&title="+encodeURIComponent(currentTitle)
                            +"&notes="+encodeURIComponent(selectedText)
                            +"&source=firefox",
                contentScript: "setInterval(function(){ if (document.getElementById('submit_clip').value === 'Saved!') { setTimeout(function() { self.port.emit('close', null);}, 700); }}, 500);"
            });
            kipptPanel.port.on("close", function () {
                kipptPanel.destroy();
            });
            
            kipptPanel.show();
        }
    });

};