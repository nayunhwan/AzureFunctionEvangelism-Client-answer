var video = document.getElementById('video');
var _canvas;

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
	$.ajax({
		url: url,
		type: 'POST',
		headers: {
			'_id': localStorage.getItem('_id'),
      'nickname': $('#inputNickname').val(),
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

$(function() {

	// #2 '_id'라는 token을 생성합니다.
	// 최초 접속 시간을 기준으로하여 hash화하며, hash 알고리즘은 SHA256을 사용합니다.
	// 생성된 토큰은 localStorage의 '_id'값으로 저장하며, localStorage에 '_id' 토큰이 없는 경우에만 token을 생성하도록 합니다.
	if (localStorage.getItem('_id') === null) {
 			var d = new Date();
 			localStorage.setItem('_id', SHA256(d.toString()));
 	}
	console.log(localStorage.getItem('_id'));

  // #3 웹 브라우저상에 웹캠 스트림을 표시합니다.
  // navigator.getUserMedia(constraints, successCallback, errCallback) 메소드를 이용하여
  // video 스트림을 받아와 <video/> 태그에 표시합니다.
  navigator.getUserMedia({ video: true },
		function(localMediaStream) {
			video.srcObject = localMediaStream;
		},
		function(err) {
			console.log(err);
		}
	);

	// When the button is clicked, send the blob to the server.
	$('button').click(function(){
    analyzeImage();
  });

	// setInterval(function() {
	// 	console.log('capture');
	// 	analyzeImage();
	// }, 10*1000);


});
