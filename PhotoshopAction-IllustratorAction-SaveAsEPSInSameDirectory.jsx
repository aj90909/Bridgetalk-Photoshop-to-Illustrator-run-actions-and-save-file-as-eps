#target photoshop
app.doAction ("ps action name", "ps action set"); //replace w your action details
var psdpath = activeDocument.path.fsName;
var parentdirectory = activeDocument.path.name;
var strScript = """
app.doScript("illustrator action name", "illustrator action set"); //replace w your action details
var doc = app.activeDocument;
if (documents.length > 0){
    // Create the illusrtratorSaveOptions object to set the AI options
    var saveOpts = new EPSSaveOptions();
    // Setting IllustratorSaveOptions properties. 
    saveOpts.embedLinkedFiles = embedImage = true;
    saveOpts.embedAllFonts = embedFont = true;
    saveOpts.includeDocumentThumbnails = true;
	saveOpts.saveMultipleArtboards = false;
        fullDocName = doc.fullName;
        for (i=0; i<doc.layers.length; i++){
            if (i-1<0) doc.layers[i].visible = true;
            else {
                doc.layers[i-1].visible = false;
                doc.layers[i].visible = true;
            }
            if (doc.layers[i].locked == false) {    
                docName = doc.layers[i].name+".eps";    
                var saveName = new File ( "%1/%2 -- suffix.eps"); //replace " -- suffix" to whatever, keep .eps 
                doc.saveAs( saveName, saveOpts );
            }
        }
    }
""";
var editedScript = strScript.replace("%1", psdpath).replace("%2", parentdirectory);
BridgeTalk.bringToFront("illustrator-25"); // switch view to illustrator to prevent crashing 
var bt = new BridgeTalk;
//declare your illustrator version
bt.target = "illustrator-25";         
bt.body = editedScript;
bt.send();
