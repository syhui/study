/**
 * merge两个有序链表*/

function mergeHead(head1, head2) {
  if (!head1) {
    return head2
  } else if (!head2) {
    return head1
  }
  let preHead = new ListNode(-1)
  let node = preHead
  while (head1 && head2) {
    if (head1.val <= head2.val) {
      node.next = head1
      head1 = head1.next
    } else if (head1.val > head2.val) {
      node.next = head2
      head2 = head2.next
    }
    node = node.next
  }
  node.next = head1 || head2
  return preHead.next
}

/**
 * 删除链表的倒数第n个节点*/

function removeHead(head, n) {
  let node = head
  let temp = head
  while (--n) {
    node = node.next
  }
  if (!node.next) return head
  while (node && node.next) {
    node = node.next
    temp = temp.next
  }
  temp.next = temp.next.next
  return head
}

/**
 * 删除链表值为val个节点*/
function removeHead(head, val) {
  let node = head
  if (node.val === val) return node.next
  while (node.next && node.next.val != val) {
    node = node.next
  }
  if (!node.next) return head

  node.next = node.next.next
  return head
}
/**
 * 反转链表*/

function reverseHead(head) {
  let preHead = null
  while (head) {
    let temp = head.next
    if(preHead===null){
      head.next = null
    }else{
      head.next = preHead
    }
    preHead = head
    head = temp
  }
  return preHead
}
/**
 * 回文链表*/
var isPalindrome = function(head) {
  if(!head) return true;
  let s = '', p = head;
  while(p) {
      s += p.val;
      p = p.next;
  }
  if(s.split('').reverse().join('') === s) return true;
  else return false;
};

/**
 * 两数之和*/

 var addTwoNumbers = function(l1, l2) {
     let dfs= function(l1,l2,carry){
      if(!l1&&!l2&&carry==0){
        return null
      }
      let val1 = l1?l1.val:0
      let val2 = l2?l2.val:0
      let sum = val1+val2+carry
      let node = new NodeList()

      node.next = dfs(l1.next?l1.next:0,l2.next?l2.next:0,Math.floor(sum/10))
      node = node.next
      return node
     }
};
