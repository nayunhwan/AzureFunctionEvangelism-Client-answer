var video = document.getElementById('video');
var canvas = document.getElementById('motion');
var score = document.getElementById('score');
var captured = document.getElementById('captured');
var _canvas;

var isLoading = false;

$(function() {
	$('button').click(function(){
    analyzeImage();
  });

	setInterval(function() {
		console.log('capture');
		analyzeImage();
	}, 10*1000);

	navigator.getUserMedia({ video: {width: 640,	height: 480} },
		function(localMediaStream) {
			video.srcObject = localMediaStream;
			console.log('test');
		},
		function(err) {
			console.log(err);
		}
	);
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
	var url = 'https://alphaca.azurewebsites.net/api/HttpTriggerJS1?code=5LrKggzCpNWo9Lhf6gAaEpfetACN9dZtpZwDssockYzhi5VGWSKM1Q==';
	var blob = getBlob();
	var formData = new FormData();
	$.ajax({
		url: url,
		type: 'POST',
		headers: {
			'_id': localStorage.getItem('_id'),
			'Content-Type': "application/octet-stream",
		},
		processData: false,
		data: blob,
		success: function(data) {
			console.log(data);
		},
		error: function(err) {
			console.log(err);
		}
	});
}
