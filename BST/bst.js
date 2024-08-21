class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class Bst {
  constructor(...values) {
    this.root = null;
    this.size = 0;

    for (var i = 0; i < values.length; i++) {
      this._add(values[i]);
    }
  }
  

  isEmpty(){
    return this.size===0;
  }

  

  add(...values) {
    for (var i = 0; i < values.length; i++) {
      this._add(values[i]);
    }
  }

  _add(value) {
    var newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      this.size++;
    } else {
      this.addNode(this.root, newNode);
    }
  }

  addNode(root, newNode) {
    if (newNode.value < root.value) {
      if (root.left === null) {
        root.left = newNode;
        this.size++;
      } else {
        this.addNode(root.left, newNode);
      }
    } else if (newNode.value > root.value) {
      if (root.right === null) {
        root.right = newNode;
        this.size++;
      } else {
        this.addNode(root.right, newNode);
      }
    }
  }

  contains(root, value) {
    if (!root) {
      return false;
    }

    if (root.value === value) {
      return true;
    } else if (value < root.value) {
      return this.contains(root.left, value);
    } else {
      return this.contains(root.right, value);
    }
  }

  inorderTraversal(root) {
    if (root) {
      this.inorderTraversal(root.left);
      console.log(root.value);
      this.inorderTraversal(root.right);
    }
  }

  preorderTraversal(root) {
    if (root) {
      console.log(root.value);

      this.preorderTraversal(root.left);
      this.preorderTraversal(root.right);
    }
  }

  postorderTraversal(root) {
    if (root) {
      this.postorderTraversal(root.left);
      this.postorderTraversal(root.right);
      console.log(root.value);
    }
  }
}

function timeTakenByFunction(func, funcName = "") {
  var start = performance.now();
  func;
  var end = performance.now();

  return `Time taken by the ${funcName} function = ${(end - start).toFixed(
    5
  )} ms`;
}

try{
    module.exports={Bst,timeTakenByFunction}
}catch(e){
    console.log(e);
}