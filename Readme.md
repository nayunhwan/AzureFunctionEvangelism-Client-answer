# Usage
서버는 `python`을 이용하여 간단하게 실행시킬 수 있습니다.

```shell
$ python -m SimpleHTTPServer
```
서버가 실행된 이후에는 `localhost:8000`으로 접속하여 확인할 수 있습니다.

## \#1 html에 video태그를 추가합니다.
`video`라는 `id`값을 가진 `<video/>` 태그를 생성해줍니다. 이때 꼭 `autoplay` 옵션을 활성화 시켜줘야 합니다.

```html
<!-- index.html -->
<figure>
  <!-- #1 id값으로 'video'를 가진 태그를 생성합니다. -->
  <video id="video" autoplay></video>
  <figcaption>Live Video</figcaption>
</figure>
```

## \#2 
