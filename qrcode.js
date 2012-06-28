//javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://raw.github.com/cherifya/flashit/master/qrcode.js';})();

(function () {
    var overlayPanel = null;
    var overlayPanelContent = null;

    runBookmarklet();

    function customURL(url) {
      if (url.indexOf('maps.google.') != -1) {
        return document.getElementById('link').href;
      } else {
        return url;
      }
    }

    function getSelected() {
      if (window.getSelection) {
        return window.getSelection();
      } else if (document.getSelection) {
        return document.getSelection();
      } else if (document.selection) {
        return document.selection.createRange().text;
      }
      return false;
    }
    
    function buildQrCodeURL(link) {
        var url  = "https://chart.googleapis.com/chart?cht=qr&chs=250x250&chld=L|1&chl=" + encodeURIComponent(link);
        return url;
                
    }

    function loadCss() {
        var css = '#qrPanel { background-color: rgba(0,0,0,0.9); position:fixed; width:100%; height:100%; top:0; z-index:10000; text-align:center;} ';
        css = css + '#qrPanel #qrPanelContent {position: relative; background-color: lightgray; width:400px; height:400px; margin-top: 100px; margin-left: auto; margin-right:auto;  text-align:center; padding: 20px; border-radius: 10px; border:solid 3px gray;} ';
        css = css + '#qrPanel #qrPanelContent p{text-align: left; font-size:small; font-family: geneva; color:black;}';
        css = css + '#qrPanel .qrcode {  position:relative; margin-top: 40px; margin-left: auto; margin-right: auto; } ';
        css = css + '#qrPanel #closeDiv {  position:absolute; top:5px; right:10px; color: black; font-weight:bold; cursor:pointer;} #closeDiv:hover {text-decoration: underline;} ';
        var style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    }

    function closePanel() {
        if (overlayPanel) {
            document.body.removeChild(overlayPanel);
            overlayPanel = overlayPanelContent = null;
        }
    }
    
    function createOverlay() {
        loadCss();

        overlayPanel = document.createElement("div");
        overlayPanel.setAttribute("id","qrPanel");
        overlayPanel.onclick = closePanel;
        document.body.appendChild(overlayPanel);

        overlayPanelContent = document.createElement("div");
        overlayPanelContent.setAttribute("id","qrPanelContent");
        overlayPanelContent.innerHTML = '<p>Please scan the flashcode below with your smartphone to load the current page.<br/>Don\'t have a flashcode scanner? Try <b><a href="http://www.flashcode.fr">FlashCode</a></b> app.</p>';
        overlayPanel.appendChild(overlayPanelContent);

        var closeDiv = document.createElement("a");
        closeDiv.setAttribute("id","closeDiv");
        closeDiv.innerHTML = 'close';
        closeDiv.onclick = closePanel;
        overlayPanelContent.appendChild(closeDiv);
    }
    
    function showQrCode(qrCodeUrl) {
        if (!overlayPanel) {
            createOverlay();
        }
        
        var img = document.createElement("img");
        img.setAttribute("src", qrCodeUrl);
        img.setAttribute("class", "qrcode");
        overlayPanelContent.appendChild(img);
            
    }
    
    function runBookmarklet() {
        var selectedText = getSelected();
        var qrData = (selectedText == false) ? customURL(document.location.href) : selectedText;
        var qrCodeUrl = buildQrCodeURL(qrData);
        
        showQrCode(qrCodeUrl);
    }
    
})();