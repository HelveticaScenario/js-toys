/*
use case:
replaceing zero or more sequencial characters with zero or more new sequencial characters

"hel*lo" "hel*hats*lo"

"h*ell*o" "h*o"


*/
/*
  the diff function takes in 2 strings and
  feeds back a list of changes to be made
  to the first string to match the second string.
  the object that it returns has 3 properties.
  the start and end props define a range of indices
  that denote the affected area of the first string.
  any characters within that range are removed and
  replaced with the string in the data prop.

  this system allows for:

    adding characters: where start and end are the same (denoting the point of
    insertion) and data is not an empty string

    removing characters: where end is bigger than start (denoting the range of
    characters to be deleted) and data is an empty string

    replaceing characters: where end is bigger than start (denoting the range of
    characters to be deleted) and data is not an empty string (denoting the data
    to be inserted in place)
    
*/

//TODO write unit test for StringDiff methods


var StringDiff = {
  diff: function(oldStr,newStr){
    if(oldStr === newStr){
      return {start:0,end:0,data:""};
    }
    var oldArr = oldStr.split('');
    var newArr = newStr.split('');
    var leftMostChangeIdx = this._findLeftMostChangeIdx(oldArr,newArr);
    var rightMostChangeIdx = -this._findLeftMostChangeIdx(oldArr.reverse(),newArr.reverse());
    var oldStrDiff = this.getDifference(oldStr,leftMostChangeIdx,rightMostChangeIdx); //the substring to be removed
    var newStrDiff = this.getDifference(newStr,leftMostChangeIdx,rightMostChangeIdx); //the substring to be inserted
    return {start: leftMostChangeIdx,
            end: leftMostChangeIdx + oldStrDiff.length,
            data: newStrDiff};
  },
  _findLeftMostChangeIdx: function(oldArr,newArr){
    for(var i = 0; i < Math.max(oldArr.length,newArr.length); i++){
      if(oldArr[i] !== newArr[i]){
        return i;
      }
    }
  },
  getDifference: function(str,leftMostChangeIdx,rightMostChangeIdx){
    return str.slice(leftMostChangeIdx,rightMostChangeIdx < 0? rightMostChangeIdx: str.length);
  }
}
