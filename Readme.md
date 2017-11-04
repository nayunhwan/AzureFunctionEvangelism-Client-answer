# Usage

```shell
$ python -m SimpleHTTPServer
```

When server is running, go to the `localhost:8000` in the web browser

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
