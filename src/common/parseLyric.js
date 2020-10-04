/**
   * 解析歌词的方法
   * 正则表达式
   */
  export function parseLyric(lyrics){
    //定义一个数组，存储歌词和时间，而且歌词和时间能够一一对应
    var lyricResult = []; 
    //将所有歌词组成的字符串切割为每句歌词组成的数组      typeof:判断变量的数据类型
    // 张三：嘻嘻
    //使用split(切割方法)对换行字符(\n   \r:回车   \t：tab键位)进行切割
    //split:切割   切割完之后返回的是数组
    var lyricArray = lyrics.split("\n");
    //判断最后一个元素(歌词和时间)是否为空，如果为空，删掉
    if(lyricArray[lyricArray.length-1]==""){
      //删除元素    队列：先进先出    栈：先进后出
      lyricArray.pop();
    }
    //时间满足格式： [xx:xx.xxx] 规律     正则表达式通常被用来检索、替换那些符合某个模式(规则)的文本
    //书写时间正则表达式    \[:使用转义字符仅仅表示中括号   数字：[0-9] ==== \d   {m}:前面字符的数量为m个
    //点 .  :匹配除了换行符以外的任意单个字符     {m,n}:前面字符个数为2位到3位
    var pattern = /\[\d{2}:\d{2}\.\d{2,3}\]/;
    //遍历歌词数组中的每一个元素   forEach循环    index:下标   index:首页
    lyricArray.forEach(function(v/*数组中的每一个元素*/,i/*数组中每一个元素所对应的下标*/,a/*正在遍历的数组*/){
      //使用正则表达式进行正则替换
      //replace：替换
      var real_lyric = v.replace(pattern,"");
      //对每一句歌词处理，将时间单独提取出来   match返回的是数组
      var time = v.match(pattern);     //歌曲播放进度时间是按秒位单位计算的   [00:00.000]--->00：00.000(字符串))->0秒
      // var str = "helloworld";
      // slice(0,3):代表从下标为0开始截取，到下标为3结束，而且是取0不取3，左闭右开区间
      // console.log(str.slice(0,3));
      //去除中括号   slice:截取
      //js中字符串的最后一个元素的下标是长度减一或者-1    java只能是长度减一
      //判断time是否为空
      if(time!=null){
        var timeResult = time[0].slice(1,-1);
        //对result结果切割，an冒号切割，得到一个长度为2的数组，第一个元素是分，第二个元素是秒   ["02","43.336"]
        var timeArray = timeResult.split(":");
        var finalTime = parseFloat(timeArray[0])*60+parseFloat(timeArray[1]);
        //将歌词和对应的时间添加到lyricResult数组中
        //二维数组
        // [1,2,3,4,5]    [
        // [
        //   [0,"作曲：吴亦凡"],
        //   [1,"作词：吴亦凡"],
        //   [1.23,"碗大宽无影"]
        // ]  
        lyricResult.push([finalTime,real_lyric]);
      }
    })
	
	let result = sliceNull(lyricResult)
	
    //返回歌词数组    谁调用方法就把结果返回给谁
    return result;
  }
  /**
   * 去掉空歌词,保留非空歌词
   */
  function sliceNull (lyricArray){
     //定义一个数组
     var result = [];
     //遍历每个元素
     for(var i=0;i<lyricArray.length;i++){
       //判断歌词是否为空
       if(lyricArray[i][1]!=""){
         result.push(lyricArray[i]);
       }
     }
     return result;
   }