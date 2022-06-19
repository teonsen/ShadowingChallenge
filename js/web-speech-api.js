/*
MIT License

Copyright (c) 2019 Benson Ruan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var messages = {
  "start": {
    msg: 'Click "Start shadowing" button or the microphone icon and begin speaking.',
    class: 'alert-success'},
  "speak_now": {
    msg: 'Speak now.',
    class: 'alert-success'},
  "st_recognizing": {
    msg: 'Recognizing...',
    class: 'alert-success'},
  "st_pausing": {
    msg: 'Recognition is pausing...',
    class: 'alert-warning'},
  "no_speech": {
    msg: 'No speech was detected. You may need to adjust your <a href="//support.google.com/chrome/answer/2693767" target="_blank">microphone settings</a>.',
    class: 'alert-danger'},
  "no_microphone": {
    msg: 'No microphone was found. Ensure that a microphone is installed and that <a href="//support.google.com/chrome/answer/2693767" target="_blank">microphone settings</a> are configured correctly.',
    class: 'alert-danger'},
  "allow": {
    msg: 'Click the "Allow" button above to enable your microphone.',
    class: 'alert-warning'},
  "denied": {
    msg: 'Permission to use microphone was denied.',
    class: 'alert-danger'},
  "blocked": {
    msg: 'Permission to use microphone is blocked. To change, go to chrome://settings/content/microphone',
    class: 'alert-danger'},
  "upgrade": {
    msg: 'Web Speech API is not supported by this browser. It is only supported by <a href="//www.google.com/chrome">Chrome</a> version 25 or later on desktop and Android mobile.',
    class: 'alert-danger'},
  "stop": {
      msg: 'Stop listening, click on the microphone icon to restart',
      class: 'alert-success'},
  "copy": {
    msg: 'Content copy to clipboard successfully.',
    class: 'alert-success'},
}

var current_status = '';
var final_transcript = '';
var working_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var recognition;
var flag_speech = 0;
var isfisttime = true;
var dt_start;
var textInput = document.getElementById('textarea1');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
textInput.oninput = inputChange;

$( document ).ready(function() {
  for (var i = 0; i < langs.length; i++) {
    select_language.options[i] = new Option(langs[i][0], i);
  }
  select_language.selectedIndex = 6;
  updateCountry();
  select_dialect.selectedIndex = 6;
  words1.innerHTML = getWordsStr('');
  words2.innerHTML = getWordsStr('');
  if (!('webkitSpeechRecognition' in window)) {
    upgrade();
  } else {
    showInfo('start');  
    mic_icon.style.display = 'inline-block';
  }
});

function inputChange(){
  words1.innerHTML = getWordsStr(textInput.value);
}

// 音声認識
// 参考: https://github.com/1heisuzuki/speech-to-text-webcam-overlay
function vr_function() {
  recognition = new webkitSpeechRecognition();
  recognition.lang = select_dialect.value;

  // If false, the recording will stop after a few seconds of silence.
  // When true, the silence period is longer (about 15 seconds),
  // allowing us to keep recording even when the user pauses. 
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
    showInfo('speak_now');
    start_img.src = 'images/mic-animation.gif';
  };

  recognition.onsoundstart = function() {
    // 認識中
    showInfo('st_recognizing');
  };

  recognition.onnomatch = function() {
    //document.getElementById('status').innerHTML = "音声を認識できませんでした";
    //document.getElementById('status').className = "error";
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      start_img.src = 'images/mic.gif';
      showInfo('no_speech');
      ignore_onend = true;
      if (flag_speech == 0)
        vr_function();
    }
    if (event.error == 'audio-capture') {
      start_img.src = 'images/mic.gif';
      showInfo('no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('blocked');
      } else {
        showInfo('denied');
      }
      ignore_onend = true;
    }
    //if (flag_speech == 0)
    //  vr_function();
  };

  recognition.onsoundend = function() {
    // 停止時
    showInfo('stop');
  };

  recognition.onresult = function(event) {
    if (recognizing == false) return;
    var results = event.results;
    var temp_transcript = '';
    for (var i = event.resultIndex; i < results.length; i++) {
      if (results[i].isFinal) {
        final_transcript += capitalize(results[i][0].transcript) + '.<br><br>';
        working_transcript = final_transcript;
        flag_speech = 0;
      } else {
        if (isfisttime) {
          dt_start = new Date();
          startedtime.innerHTML = 'started : ' + getTimestampStr(new Date());   
          isfisttime = false;
        }
        temp_transcript += results[i][0].transcript;
        if (i == event.resultIndex) {
          temp_transcript = capitalize(temp_transcript);
        }
        flag_speech = 1;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(temp_transcript);
    working_transcript = final_transcript + temp_transcript;
    words2.innerHTML = getWordsStr(working_transcript);

    // calc wpm
    let time_elapsed, wpm;
    [time_elapsed, wpm] = getTimeElapsed_WPM();
    startedtime.innerHTML = `started : ${getTimestampStr(dt_start)} +${time_elapsed}`; 
    elapsed_wpm.innerHTML = wpm;
  }

  flag_speech = 0;
  // 待機中
  showInfo('speak_now');
  recognition.start();
}

function getTimeElapsed_WPM() {
  //let dt_now = (new Date()).getTime();
  let dt_now = new Date();
  let spoken_sec = Math.trunc((dt_now.valueOf() - dt_start.valueOf()) / 1000);
  let m = Math.trunc(spoken_sec / 60);
  let ss = ('00' + spoken_sec % 60).slice(-2);
  let time_elapsed = m + ':' + ss;
  // WPM = 単語数 / 秒数 × 60秒
  let wpm = 'wpm=' + Math.trunc(countWords(working_transcript) / spoken_sec * 60);
  return [time_elapsed, wpm];
}

function getWordsStr(text) {
  let n = countWords(text);
  if (n == 0) return '0 words';
  if (n == 1) return '1 word';
  return n + " words";
}

function updateCountry() {
  for (var i = select_dialect.options.length - 1; i >= 0; i--) {
    select_dialect.remove(i);
  }
  var list = langs[select_language.selectedIndex];
  for (var i = 1; i < list.length; i++) {
    select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
}

function upgrade() {
  mic_icon.style.visibility = 'hidden';
  showInfo('upgrade');
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function countWords(s){
  s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
  s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
  s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
  return s.split(' ').filter(function(str){return str!="";}).length;
  //return s.split(' ').filter(String).length; - this can also be used
}

$("#start_rec").click(function () {
  if (recognizing) {
    resetRecognizedData();
  }
  else {
    startRecognition();
  }
});

$("#mic_icon").click(function () {
  if (recognizing) {
    //stopRecognition();
    recognizing = false;
    start_img.src = 'images/mic.gif';
    showInfo('st_pausing');
  }
  else {
    if (working_transcript) {
      if (current_status == 'st_pausing') {
        recognizing = true;
        start_img.src = 'images/mic-animation.gif';
        showInfo('st_recognizing');
      }
      else
      {
        startRecognition();
      }
    }
    else {
      startRecognition();
    }
  }
});

function getTimestampStr(dt) {
  // タイムスタンプ機能
  //let now = new window.Date();
  //let Year = now.getFullYear();
  //let Month = (("0" + (now.getMonth() + 1)).slice(-2));
  //let Date = ("0" + now.getDate()).slice(-2);
  let Hour = ("0" + dt.getHours()).slice(-2);
  let Min = ("0" + dt.getMinutes()).slice(-2);
  let Sec = ("0" + dt.getSeconds()).slice(-2);
  //let timestamp = Year + '-' + Month + '-' + Date + ' ' + Hour + ':' + Min + ':' + Sec + '&#009;'
  let timestamp = `${Hour}:${Min}:${Sec}`;
  return timestamp;
}

function resetRecognizedData() {
  final_transcript = '';
  working_transcript = '';
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  startedtime.innerHTML = '';
  finishedtime.innerHTML = '';
  words2.innerHTML = getWordsStr('');
  outputdiv1.innerHTML = '';
  outputdiv2.innerHTML = '';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  output_span.innerHTML = '';
}

function startRecognition() {
  if (recognizing) {
    recognition.stop();
    return;
  }
  resetRecognizedData();
  start_img.src = 'images/mic-slash.gif';
  vr_function();
  showInfo('allow');
  isfisttime = true;
  start_timestamp = (new Date()).getTime();
}

$("#select_language").change(function () {
  updateCountry();
});

function showInfo(s) {
  current_status = s;
  if (s) {
    var message = messages[s];
    $("#info").html(message.msg);
    $("#info").removeClass();
    $("#info").addClass('alert');
    $("#info").addClass(message.class);
  } else {
    $("#info").removeClass();
    $("#info").addClass('d-none');
  }
}

function getComparableText(txt) {
  var ret = txt.replaceAll("’", "");
  ret = ret.replaceAll("'", "");
  ret = ret.replaceAll("\"", "");
  ret = ret.replaceAll(",", "");
  ret = ret.replaceAll(".", "");
  ret = ret.replaceAll("(", "");
  ret = ret.replaceAll(")", "");
  ret = ret.replaceAll("?", "");
  ret = ret.replaceAll(":", "");
  ret = ret.replaceAll("-", "");
  ret = ret.replaceAll("/", "");
  ret = ret.toLowerCase();
  return ret;
}

function stopRecognition() {
  recognizing = false;
  isfisttime = true;
  start_img.src = 'images/mic.gif';
  if (ignore_onend) {
    return;
  }
  //if (!final_transcript) {
  if (!working_transcript) {
    showInfo('start');
    finishedtime.innerHTML = '';
    return;
  }
  showInfo('stop');
  finishedtime.innerHTML = 'stopped : ' + getTimestampStr(new Date());
  if (textInput.value) {
    showDiff();
  }
}

function showDiff() {
  let text1 = textInput.value;
  if (!text1) {
    document.getElementById('output_span').innerHTML = '比較対象文字列が入力されていません。<br>There is no text to compare with.';
    return;
  }
  if (!working_transcript) {
    document.getElementById('output_span').innerHTML = '音声認識された文字列がありません。<br>No text is recognized.';
    return;
  }
  text1 = getComparableText(text1);
  let text2 = getComparableText(working_transcript.replaceAll('<br><br>', ''));
  
  var dmp = new diff_match_patch();
  dmp.Diff_Timeout = 1;

  var d = dmp.diff_main(text2, text1);
  dmp.diff_cleanupSemantic(d);
  let phtml, ins, del, eql;
  //var ds = dmp.diff_prettyHtml(d);
  [phtml, ins, del, eql] = dmp.diff_prettyHtml(d);

  let time_elapsed, wpm;
  [time_elapsed, wpm] = getTimeElapsed_WPM();
  /*
  let sum = ins + del + eql;
  let peql = Math.trunc(eql / sum * 100);
  let pins = Math.trunc(ins / sum * 100);
  let pdel = 100 - peql - pins;
  */
  let sum = ins + eql;
  let peql = Math.trunc(eql / sum * 100);
  let pins = 100 - peql;
  let outstr1 = `Comparison results (time elapsed=${time_elapsed}, average ${wpm})<br>`;
  document.getElementById('outputdiv1').innerHTML = outstr1;
  document.getElementById('output_span').innerHTML = phtml;
  //let outstr2 = `pronounced correctly: ${eql} (${peql}%)<br>correct script: ${ins} (${pins}%)<br>mispronounced/unrecognized: ${del} (${pdel}%)<br>`;
  let outstr2 = `pronounced/recognized correctly: ${eql} (${peql}%)<br>unread/unrecognized: ${ins} (${pins}%)<br>`;
  document.getElementById('outputdiv2').innerHTML = outstr2;

  // https://stackoverflow.com/questions/20966817/how-to-add-text-inside-the-doughnut-chart-using-chart-js
  /*
  var pieData = [
    {
      value: peql,
      color: "#1c4da3"
    },
    {
      value : pins,
      color : "#addded"
    },
    {
      value : pdel,
      color : "#e3768e"
    }
  ];
  */
  var pieData = [
    {
      value: peql,
      color: "#1c4da3"
    },
    {
      value : pins,
      color : "#addded"
    }
  ];
  // percentageInnerCutout : 80 => doughnut's width is nallow, 50 => thick.
  var myPie = new Chart(ctx).Doughnut(pieData, {percentageInnerCutout : 70});
}

$("#compute_diff").click(function () {
  if (recognizing) {
    recognizing = false;
    recognition.stop();
    stopRecognition();
  }
  showDiff();
});