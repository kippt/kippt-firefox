var self = require("self");
var selection = require("selection");
var tabs = require("tabs");
var widget = require('widget').Widget;
var panel = require('panel').Panel;

exports.main = function() {
    var selectedText = {text: '', tabUrl: null};
    
    function selectionChanged(event){
        selectedText.text = selection.text;
        selectedText.tabUrl = tabs.activeTab.url;
    }
    
    selection.on('select', selectionChanged);
    
    var kipptPanel = panel({
        width: 450,
        height: 240,
        contentURL : self.data.url('blank.html'),
        contentScriptWhen: "end",
        onHide: function(){ kipptPanel.contentURL = self.data.url('blank.html'); }
    });
    kipptPanel.port.on("close", function () {
        kipptPanel.destroy();
    });
    
    widget({
        id: 'kippt',
        label: 'Kippt it',
        contentURL: self.data.url("icon.png"),
        panel: kipptPanel,
        onClick: function(){
            var text = tabs.activeTab.url == selectedText.tabUrl ? selectedText.text : '';
            
            kipptPanel.contentURL = "https://kippt.com/extensions/new/?"
                                    + "url="     + encodeURIComponent(tabs.activeTab.url)
                                    + "&title="  + encodeURIComponent(tabs.activeTab.title)
                                    + "&notes="  + encodeURIComponent(text)
                                    + "&source=firefox";
            kipptPanel.contentScriptFile = self.data.url('content_script.js');
        }
    });
    
};
