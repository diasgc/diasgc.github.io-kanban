const quant = document.getElementById("quant");
const cod = document.getElementById("cod");
const notes = document.getElementById("notes");

const opts = {
  // text: "",
	// width: 128,
	// height: 128,
	colorDark : "#000000",
	colorLight : "#ffffff",
	correctLevel : QRCode.CorrectLevel.H
}

let qrc = new QRCode(document.getElementById("qrcode"), opts);

// ;s:;-s:;a:110001918;-a:;l:w24231;-l:;p:31'08'2025;-p:;c:;-c:
const tab ='\t';   // ????
const enter='\n';  // ????

function apply(){
  document.getElementById("tname").innerText = document.getElementById("des").value;
  var str = cod.value + enter + quant.value;
  if (notes.value)
    str += tab + tab + tab + notes.value;
  str += enter;
  qrc.clear();
  qrc.makeCode(str); 
}

document.getElementById("button").onclick = function(){
  apply();
}

document.getElementById("save").onclick = function() {
  html2canvas(
    document.querySelector("#frame")).then(canvas => {
        saveAs(canvas.toDataURL(), cod.value + '.png');
      }
 );
}

document.getElementById("print").onclick = () => {
  html2canvas(
    document.querySelector("#frame")).then(canvas => {
        printCanvas(canvas.toDataURL());
      }
 );
}

function changeColor(event){
  var opt = event.target;
  console.log("selColor:"+opt.value);
  document.getElementById("frame").style.borderColor = opt.value;
  //var sty = window.getComputedStyle(opt);
  //document.getElementById("tname").innerText = opt.value;
  //opts.colorDark = opt.value;
  //apply();
}

function printCanvas(src){
  var win = window.open('about:blank', "_print");
  win.document.open();
  const prtHtml = `
    <html>
      <head></head>
      <body onload="window.print()" onafterprint="window.close()">
        <img src="` + src + `"/>
      </body>
    </html>
  `
  win.document.write(prtHtml);
  win.document.close();
}

function saveAs(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}
