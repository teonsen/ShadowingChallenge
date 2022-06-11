# ShadowingChallenge
ShadowingChallenge is an opensource web app to check one's pronunciation while shadowing or dictation with Web Speech API.  
シャドーイングチャレンジは、英語学習に効果的とされる「シャドーイング」を頑張る人を応援するためのオープンソースWebアプリです。

## Usage
使い方は下記の通りです。Win/MacのChrome限定です。
1. Live DemoのリンクからShadowingChallengeを開く
2. 英語音声とそのスクリプトが公開されているサイトを探す（例：[レアジョブ](https://www.rarejob.com/), [BBC](https://www.bbc.co.uk/learningenglish/english/)）
3. シャドーイングする音声のスクリプトをコピーする（答え合わせのために使用します）
4. スクリプトをデモページの「Paste the original script here.」の部分に貼り付ける
5. 「Start shadowing」ボタンを押す
6. マイクの使用許可を求められるので、「許可」をクリックする
7. 上記2.で開いたサイトで音源を再生する
8. シャドーイングを始める（上記6.を行なった時点から15秒以内に発話を開始してください）
9. 終わったら「Compare」ボタンを押すか、約15秒無音で待機する
10. 上記4.で貼り付けたテキストと、シャドーイングで認識された結果テキストを比較した差異を確認する

![How to start](https://user-images.githubusercontent.com/48349549/172044263-e7b38b07-335c-486f-8413-74400eb109fa.gif)  
<sub>
上の動画ではミキサーを使用していますが、通常のシャドーイングではミキサーを使う必要はありません  
動画内の使用教材：[レアジョブ](https://www.rarejob.com/)さん公式「[WEEKLY NEWS ARTICLE](https://www.rarejob.com/lesson/material/wna/)」 [May 31,2022](https://www.rarejob.com/lesson/material/wna/2022/05/31/us-retailers-worried-that-summer-travel-may-lead-to-less-shopping/)　　
</sub>

## Live Demo
[https://teonsen.github.io/ShadowingChallenge/](https://teonsen.github.io/ShadowingChallenge/)

## How accurate is it?
`「私は発音には自信がある。認識精度が悪いんじゃないの？」`  
という方向けに補足です。  
音声認識には「[Web Speech API](https://developer.mozilla.org/ja/docs/Web/API/Web_Speech_API)」を使用していますが、英語の認識は良い感じです。(個人の感想です)  
どれくらい「認識が良い」かは次の方法で確認しました。  
- [レアジョブ](https://www.rarejob.com/)さん公式教材「[WEEKLY NEWS ARTICLE](https://www.rarejob.com/lesson/material/wna/)」[May 31,2022](https://www.rarejob.com/lesson/material/wna/2022/05/31/us-retailers-worried-that-summer-travel-may-lead-to-less-shopping/)を使用  
- ミキサーを使用して音声出力をマイク入力にリダイレクト  

この比較結果を確認すると、スクリプトにない冒頭と最後の部分が赤くなっていて、中身の違いはほとんどないことがわかります。  
![スクリーンショット 2022-06-06 20 16 46](https://user-images.githubusercontent.com/48349549/172150834-9509ad72-8f49-4620-907e-7d792ecfde76.png)

この場合はAI音声をAIが再認識したものですが、ネイティブスピーカー音源の場合も同様の認識精度です。  
Web Speech APIの認識精度に疑問を持った時に参考にしてください。  

# Acknowledgements
This repo is just a combination of these great repos. Thanks a lot!
- [https://github.com/mdn/web-speech-api](https://github.com/mdn/web-speech-api)
- [https://github.com/bensonruan/Chrome-Web-Speech-API](https://github.com/bensonruan/Chrome-Web-Speech-API)
- [https://github.com/1heisuzuki/speech-to-text-webcam-overlay](https://github.com/1heisuzuki/speech-to-text-webcam-overlay)
- [https://github.com/google/diff-match-patch](https://github.com/google/diff-match-patch)
- [https://github.com/kpdecker/jsdiff](https://github.com/kpdecker/jsdiff)
- [https://github.com/DKMitt/speech-to-text-js](https://github.com/DKMitt/speech-to-text-js)
