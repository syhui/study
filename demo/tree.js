/**判断给定的一颗树是否是 二叉搜索树
 * 根据二叉树中序遍历是有序数组
 * 前序中序后续遍历称为深度优先遍历**/
var isValidBST = function(root) {
  const quene = [];
  function dfs(root){
    if (!root){
      return;
    }
    root.left && dfs(root.left);
    quene.push(root.val);
    root.right && dfs(root.right);
  }

  dfs(root)

  for(let i=0; i<quene.length; i++){
    if(quene[i] >= quene[i+1]){
      return false;
    }
  }

  return true;
};
/**二叉树层序遍历(反向)
 * 层序遍历是广度优先遍历*/
var levelOrderBottom = function(root) {
  var queue = [];
  var result = [];
  if (root !== null) {
    queue.push(root);
  }
  // while 循环层数 for循环同层节点个数
  while(queue.length !== 0) {
    var level = [];
    var len = queue.length;
    for (var i = 0; i < len; i ++) {
      var currentNode = queue.shift();
      level.push(currentNode.val);
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
    }
    result.push(level);
  }
  return result.reverse();
};

/**
 * 二叉树是否有路径之和为一个定值，求路径*/
var pathSum = function(root, sum) {
  if (!root) {
    return [];
  }
  const pathes = [];
  __pathSum(root, sum, pathes, []);
  return pathes;
};

function __pathSum(root, sum, pathes, path) {
  if (!root) {
    return;
  }

  path = [...path, root.val]; // 深拷贝

  if (!root.left && !root.right && root.val === sum) {
    pathes.push(path);
    return;
  }

  __pathSum(root.left, sum - root.val, pathes, path);
  __pathSum(root.right, sum - root.val, pathes, path);
}

/**
 * 将有序数组转化为搜索二叉树*/
var sortedArrayToBST = function(nums) {
  if(!nums.length) return null

  let creatTree = (left, right) => {
    if(left > right) return null
    let mid = Math.floor((left + right) / 2)     // 向上向下取整都行 两种结果都通过
    let root = new TreeNode(nums[mid])
    root.left = creatTree(left, mid - 1)
    root.right = creatTree(mid + 1, right)
    return root
  }

  return creatTree(0, nums.length - 1)
};

