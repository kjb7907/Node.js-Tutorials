var _ = require('underscore');
 //require함수는 모듈을 가져오고 그 모듈을 사용할수있는 객체를 리턴한다.
 //underscore 는 _ 라는 이름의 변수를 쓰는 관습이 있다.
var arr = [3,6,9,1,12] //배열 생성
//underscore가 제공하는 기능중에는 자바스크립트의
//배열의 기능중 빈약한부분을 채워주는 여러가지 기능을 가지고 있다.
console.log(arr[0]);
console.log(_.first(arr));
//배열의 첫번째 원소를 가져오는 함수
console.log(arr[arr.length-1]);
console.log(_.last(arr));
//배열의 마지막 원소를 가져오는 함수
