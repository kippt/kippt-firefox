# kippt-firefox

This is Kippt.com's official Firefox add-on. It's licensed under MIT and we'll accept improvements in pull-requests.

The extension was build using [Firefox Add-on SDK](https://addons.mozilla.org/en-US/developers/docs/sdk/1.0/dev-guide/addon-development/about.html) and you can compile it with the following command:

    cfx xpi

Originally created by @thierrylemoulec

## Dev notes

To show the error log, use keyboard shortcut Cmd+Shift+J

Update.rdf related links:

    https://developer.mozilla.org/en-US/docs/Building_an_Extension
    https://developer.mozilla.org/en-US/docs/Extension_Versioning,_Update_and_Compatibility

## Distribution

This extension is distributed via Kippt, not Mozilla's add-on site. Distributable url is:

    http://addons.kippt.com/firefox/kippt.xpi

To compile the extension with correct update links, use the following command:

    cfx xpi --update-link https://s3.amazonaws.com/addons.kippt.com/firefox/kippt.xpi --update-url https://s3.amazonaws.com/addons.kippt.com/firefox/kippt.update.rdf