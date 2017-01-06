var _ = require('underscore');
 //require�Լ��� ������ �������� �� ������ �����Ҽ��ִ� ��ü�� �����Ѵ�.
 //underscore �� _ ���� �̸��� ������ ���� ������ �ִ�.
var arr = [3,6,9,1,12] //�迭 ����
//underscore�� �����ϴ� �����߿��� �ڹٽ�ũ��Ʈ��
//�迭�� ������ �����Ѻκ��� ä���ִ� �������� ������ ������ �ִ�.
console.log(arr[0]);
console.log(_.first(arr));
//�迭�� ù��° ���Ҹ� �������� �Լ�
console.log(arr[arr.length-1]);
console.log(_.last(arr));
//�迭�� ������ ���Ҹ� �������� �Լ�
