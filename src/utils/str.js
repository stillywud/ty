
 /**
  * 截取字符
  * @param {*} str 
  * @param {*} len 
  */
 export const cutString = (str, len) => { 
   if(!str){
     return null;
   }
    //length属性读出来的汉字长度为1 
    if(str.length*2 <= len) { 
      return str; 
    } 
    var strlen = 0; 
    var s = ""; 
    for(var i = 0;i < str.length; i++) {  
      s = s + str.charAt(i); 
      if (str.charCodeAt(i) > 128) { 
        strlen = strlen + 2; 
        if(strlen >= len){ 
          return s.substring(0,s.length-1) + "..."; 
        } 
      } else { 
        strlen = strlen + 1; 
        if(strlen >= len){ 
          return s.substring(0,s.length-2) + "..."; 
        } 
      } 
    } 
    return s; 
  } 

