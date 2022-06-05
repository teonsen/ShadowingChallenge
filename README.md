# ShadowingChallenge
ShadowingChallenge is an web app to check one's pronunciation while shadowing or dictation with Web Speech API.
シャドーイングチャレンジは、英語学習に効果的とされる「シャドーイング」を頑張る人を補助するためのアプリです。

# Usage
使い方は下記の通りです。Chrome限定です。
1. Live DemoのリンクからShadowingChallengeを開く
2. 英語音声とそのスクリプトが公開されているサイトを探す（例：レアジョブ）
3. シャドーイングする音声のスクリプトをコピーする（答え合わせのために使用します）
4. スクリプトをデモページの「Paste the original script here.」の部分に貼り付ける
5. 「Start shadowing」ボタンを押す
6. マイクの使用許可を求められるので、「許可」をクリックする
7. 上記2.で開いたサイトで音源を再生する
8. シャドーイングを始める（上記6.を行なった時点から15秒以内に発話を開始してください）
9. 終わったら「Compare」ボタンを押すか、約15秒無音で待機する
10. 上記4.で貼り付けたテキストとシャドーイング結果を比較した結果を確認する

# Live Demo
[https://teonsen.github.io/ShadowingChallenge/](https://teonsen.github.io/ShadowingChallenge/)

# Acknowledgements
This repo is just a combination of these great repos. Thanks a lot!
- [https://github.com/mdn/web-speech-api](https://github.com/mdn/web-speech-api)
- [https://github.com/bensonruan/Chrome-Web-Speech-API](https://github.com/bensonruan/Chrome-Web-Speech-API)
- [https://github.com/google/diff-match-patch](https://github.com/google/diff-match-patch)
- [https://github.com/DKMitt/speech-to-text-js](https://github.com/DKMitt/speech-to-text-js)
