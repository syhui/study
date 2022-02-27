/**判断给定的一颗树是否是 二叉搜索树
 * 根据二叉树中序遍历是有序数组
 * 前序中序后续遍历称为深度优先遍历**/
var isValidBST = function (root) {
  const quene = [];
  function dfs(root) {
    if (!root) {
      return;
    }
    root.left && dfs(root.left);
    quene.push(root.val);
    root.right && dfs(root.right);
  }

  dfs(root)

  for (let i = 0; i < quene.length; i++) {
    if (quene[i] > quene[i + 1]) {
      return false;
    }
  }

  return true;
};
/**二叉树层序遍历(反向)
 * 层序遍历是广度优先遍历*/
var levelOrderBottom = function (root) {
  const quene = []
  const result = []
  if (root) {
    quene.push(root)
  }
  while (quene.length > 0) {
    const level = []
    const len = quene.length
    for (let i = 0; i < len; i++) {
      const node = quene.shift()
      level.push(node.val)
      if (node.left) quene.push(node.left)
      if (node.right) quene.push(node.right)
    }
    result.push(level)
  }
  return result.reverse();
};

/**
 * 二叉树是否有路径之和为一个定值*/

 function pathSum(root, sum) {
  if (!root) return []
  let hasPath = false
  let dfs = (root, sum) => {
    if (!root.left && !root.right && sum === root.val) {
      hasPath = true
    }
    dfs(root.left, sum - root.val)
    dfs(root.right, nusumm - root.val)
  }
  dfs(root, sum)
  return hasPath
}

/**
 * 二叉树是否有路径之和为一个定值，求路径*/
var pathSum = function (root, sum) {
  if (root === null) return [];
  const res = [];
  const dfs = (root, sum, path) => {
    // 到了叶子节点并且当前节点的值跟剩余sum相等，则推入结果集中
    if (root.val === sum && !root.left && !root.right) {
      res.push(path);
    }
    // 路径中加入当前节点的值
    path.push(root.val);
    // 递归的去左右子树当中查找路径
    if (root.left) dfs(root.left, sum - root.val, path.slice());
    if (root.right) dfs(root.right, sum - root.val, path.slice());
  };
  dfs(root, sum, []);
  return res;
}

/**
 * 将有序数组转化为搜索二叉树*/
var sortedArrayToBST = function (nums) {
  if (!nums.length) return null

  let creatTree = (left, right) => {
    if (left > right) return null
    let mid = Math.floor((left + right) / 2)     // 向上向下取整都行 两种结果都通过
    let root = new TreeNode(nums[mid])
    root.left = creatTree(left, mid - 1)
    root.right = creatTree(mid + 1, right)
    return root
  }

  return creatTree(0, nums.length - 1)
};

