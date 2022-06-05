# ShadowingChallenge
ShadowingChallenge is an web app to check one's pronunciation while shadowing or dictation with Web Speech API.  
シャドーイングチャレンジは、英語学習に効果的とされる「シャドーイング」を頑張る人を補助するためのアプリです。

# Usage
使い方は下記の通りです。Win/MacのChrome限定です。
1. Live DemoのリンクからShadowingChallengeを開く
2. 英語音声とそのスクリプトが公開されているサイトを探す（例：[レアジョブ](https://www.rarejob.com/)）
3. シャドーイングする音声のスクリプトをコピーする（答え合わせのために使用します）
4. スクリプトをデモページの「Paste the original script here.」の部分に貼り付ける
5. 「Start shadowing」ボタンを押す
6. マイクの使用許可を求められるので、「許可」をクリックする
7. 上記2.で開いたサイトで音源を再生する
8. シャドーイングを始める（上記6.を行なった時点から15秒以内に発話を開始してください）
9. 終わったら「Compare」ボタンを押すか、約15秒無音で待機する
10. 上記4.で貼り付けたテキストとシャドーイング結果を比較した結果を確認する

（下の動画ではミキサーを使用していますが、通常のシャドーイングではミキサーを使う必要はありません）
![How to start](https://user-images.githubusercontent.com/48349549/172044263-e7b38b07-335c-486f-8413-74400eb109fa.gif)

# Live Demo
[https://teonsen.github.io/ShadowingChallenge/](https://teonsen.github.io/ShadowingChallenge/)

# How accurate is it?
`「私は発音には自信がある。認識精度が悪いんじゃないの？」`  
という方向けに補足です。  
音声認識には「Web Speech API」を使用していますが、英語の認識は良い感じです。(個人の感想です)  
どれくらい「認識が良い」かは次の方法で確認しました。  
- レアジョブさんの公開教材である「WEEKLY NEW ARTICLE」を使用  
- ミキサーを使用して音声出力をマイク入力にリダイレクト  

この比較結果を確認すると、スクリプトにない冒頭と最後の部分が赤く(下図ではグレーに)なっていて、中身の違いはほぼ大文字小文字の違いとアポストロフィーの違いであることがわかります。

![compare_result](https://user-images.githubusercontent.com/48349549/172044520-ebafb775-c02b-4a5c-9250-634e498a5e10.png)  
この場合はAI音声をAIが再認識したものですが、ネイティブスピーカーの音源の場合も同様の認識精度です。  
Web Speech APIの認識精度に疑問を持った時に参考にしてください。  

# Acknowledgements
This repo is just a combination of these great repos. Thanks a lot!
- [https://github.com/mdn/web-speech-api](https://github.com/mdn/web-speech-api)
- [https://github.com/bensonruan/Chrome-Web-Speech-API](https://github.com/bensonruan/Chrome-Web-Speech-API)
- [https://github.com/google/diff-match-patch](https://github.com/google/diff-match-patch)
- [https://github.com/DKMitt/speech-to-text-js](https://github.com/DKMitt/speech-to-text-js)
