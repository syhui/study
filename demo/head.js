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
    if (head1 < head2) {
      node.next = head1
      head1 = head1.next
    } else if (head1 > head2) {
      node.next = head2
      head2 = head2.next
    }
    node = node.next
  }

  node.next = head1 || head2
  return preHead
}

/**
 * 删除链表的第n个节点*/

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
 * 单链表添加*/

function linkedList() {
  let Node = function (element) {
    this.element = element
    this.next = null
  }
  let length = 0
  let head = null

  this.append = function (element) {
    let node = new Node(element)
    if (head == null) {
      head = node
    } else {
      let current = head
      while (current.next !== null) {
        current = current.next
      }
      current.next = node
    }
    length++
  }
}
