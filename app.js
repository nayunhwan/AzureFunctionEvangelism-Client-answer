var video = document.getElementById('video');
var canvas = document.getElementById('motion');
var score = document.getElementById('score');
var captured = document.getElementById('captured');
var _canvas;

var isLoading = false;

function initSuccess() {
	DiffCamEngine.start();
}

function initError() {
	alert('Something went wrong.');
}

function capture(payload) {
	score.textContent = payload.score;
  // if (!isLoading && payload.hasMotion) {
  //   isLoading = true;
  //   analyzeImage();
  //   console.log('test');
  // }
}

DiffCamEngine.init({
	video: video,
	motionCanvas: canvas,
	initSuccessCallback: initSuccess,
	initErrorCallback: initError,
	captureCallback: capture
});

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: 'application/octet-stream'});
}

function getBlob() {
  _canvas = document.createElement("canvas");
  var context = _canvas.getContext('2d')
  context.drawImage(video, 0, 0, _canvas.width, _canvas.height);
  var dataURL = _canvas.toDataURL('image/jpeg', 1.0);
  return dataURLtoBlob(dataURL);
}

function analyzeImage() {
  // var blob = getBlob();
  // // var url = 'https://api.projectoxford.ai/vision/v1.0/analyze?visualFeatures=Description,Faces&language=en';
	var url = 'https://alphaca.azurewebsites.net/api/HttpTriggerJS1?code=5LrKggzCpNWo9Lhf6gAaEpfetACN9dZtpZwDssockYzhi5VGWSKM1Q==';
  // var apiKey = 'c8a88151c9c84934aef42a17c161eb5f';
  // $.ajax({
  //   url: url,
  //   type: 'POST',
  //   beforeSend: function(xhrObj){
  //       xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
  //       xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
  //   },
  //   // data: blob,
	// 	data: {
	// 		name: 'hello'
	// 	},
  //   processData: false,
  //   error: function(data) {
  //     console.log(data);
  //   },
  //   success: function(data) {
  //     isLoading = false;
  //     console.log(data);
  //   }
  // });
	var blob = getBlob();
	var formData = new FormData();
	formData.append('source', blob);
	console.log(formData);
	console.log(blob);
	$.ajax({
		url: url,
		type: 'POST',
		headers: {
			// 'Content-Type': "application/json",
			'Content-Type': "application/octet-stream",
		},
		processData: false,
		data: blob,
		// data: JSON.stringify({
		// 	blob: blob,
		// 	name: 'test',
		// 	name1: 'test2'
		// }),
		success: function(data) {
			console.log(data);
		},
		error: function(err) {
			console.log(err);
		}
	})
}

$(function() {
  $('button').click(function(){
    analyzeImage()
  });
});
