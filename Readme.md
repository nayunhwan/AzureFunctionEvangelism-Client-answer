# Usage
서버는 `python`을 이용하여 간단하게 실행시킬 수 있습니다.

```shell
$ python -m SimpleHTTPServer
```
서버가 실행된 이후에는 `localhost:8000`으로 접속하여 확인할 수 있습니다.

## \#1 `_id` 토큰을 생성
맨 처음 웹서비스에 접속했을때 사람을 식별하기 위한 특별한 `hash`값을 생성합니다.
`hash` 값은 `SHA256` 알고리즘을 이용하여 생성하며, `SHA256` 알고리즘에 해당하는 코드는 이미 import 되어있기 때문에
간단히 불러와서 사용할 수 있습니다.

`hash`는 `최초 접속 시간`을 기준으로하여 만들며, 만들어진 토큰은 `localStorage`에 저장합니다.
`localStorage`에 이미 저장된 토큰이 있다면 만들어진 토큰을 가져옵니다.

#### app.js
```js
// app.js

// localStorage에 '_id'라는 토큰이 없는 경우
if (localStorage.getItem('_id') === null) {
    // 새로운 날짜 객체를 생성한 후
    var d = new Date();
    // SHA256 알고리즘을 이용하여 토큰을 생성하고 localStorage에 저장합니다.
    localStorage.setItem('_id', SHA256(d.toString()));
}
// localStorage에 제대로 저장이 되었는지 확인하기 위하여 console을 이용하여 확인합니다.
console.log(localStorage.getItem('_id'));
```


## \#2 웹캠 스트림을 웹브라우저 상에 표시
`navigator.getUserMedia(constraints, successCallback, errCallback)` 메소드를 이용하여
video 스트림을 받아와 `<video/>` 태그에 표시합니다.

#### app.js
```js
// app.js

// navigator.getUserMedia에서 video를 받아오도록 설정한 뒤에
navigator.getUserMedia({ video: true },
  function(localMediaStream) {
    //successCallback function에서 video태그의 srcObject를 localMediaStream으로 설정해줍니다.
    video.srcObject = localMediaStream;
  },
  function(err) {
    console.log(err);
  }
);
```

## \#3 Azure-function Request 요청
이제 Azure-function에 request를 보내는 코드를 작성합니다. `jQuery`의 `Ajax`를 이용하여 `post`로 보냅니다.

```js
var url  = 'YOUR-AZURE-FUNCTION-URL'
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
```


## \#4 Ajax success function 완성하기
response data 결과 값을 view 단에 잘 표현하도록 완성한다.

```js
// Age
$('.age').text(data.result.age);

// Gender
if (data.result.gender === "Male") $('.gender').text("👱🏻");
else if (data.result.gender === "Female") $('.gender').text("👩🏻");

// emotion
// 😡😬🤢😨😀😐😭😱
switch (data.result.emotion) {
  case 'anger':
    $('.emoji').text("😡");
    break;
  case 'contempt':
    $('.emoji').text("😬");
    break;
  case 'disgust':
    $('.emoji').text("🤢");
    break;
  case 'fear':
    $('.emoji').text("😨");
    break;
  case 'happiness':
    $('.emoji').text("😀");
    break;
  case 'neutral':
    $('.emoji').text("😐");
    break;
  case 'sadness':
    $('.emoji').text("😭");
    break;
  case 'surprise':
    $('.emoji').text("😱");
    break;
  default:
    $('.emoji').text("😐");
}

// Description
$('.description').text(data.result.description);
```
