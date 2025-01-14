/* globals Tree */
'use strict';

var tree = new Tree(document.getElementById('tree'), {
  navigate: true // allow navigate with ArrowUp and ArrowDown
});
// tree.on('open', e => console.log('open', e));
// tree.on('select', e => console.log('select', e));
// tree.on('action', e => console.log('action', e));
// tree.on('fetch', e => console.log('fetch', e));
// tree.on('browse', e => console.log('browse', e));

tree.on('fetch', folder => window.setTimeout(() => {
  tree.file({
    name: 'file 2/1'
  }, folder);
  tree.file({
    name: 'file 2/2'
  }, folder);

  folder.resolve();
}, 1000));

var structure = [{
  name: 'file 1'
}, {
  name: 'file 2'
}, {
  name: 'folder 1',
  open: false,
  type: Tree.FOLDER,
  selected: true,
  children: [{
    name: 'file 1/1'
  }, {
    name: 'file 1/2'
  }, {
    name: 'folder 1/1',
    type: Tree.FOLDER,
    children: [{
      name: 'folder 1/1/1',
      type: Tree.FOLDER,
      children: [{
        name: 'folder 1/1/1/1',
        type: Tree.FOLDER,
        children: [{
          name: 'file 1/1/1/1/1'
        }, {
          name: 'file 1/1/1/1/2'
        }]
      }]
    }]
  }]
}, {
  name: 'folder 2 (asynced)',
  type: Tree.FOLDER,
  asynced: true
}];
// keep track of the original node objects
tree.on('created', (e, node) => {
  e.node = node;
});
tree.json(structure);

document.getElementById('browse-1').addEventListener('click', () => {
  alert("test alert")
});

tree.on('select', e => {
  if (e.tagName === 'SUMMARY') tree.open(e.parentElement);
});

let treeIsOpen = false;
tree.on('select', e => {
  if (treeIsOpen)
  alert("Link working !");
});

function openTree(){
      var p = new Promise(function(success) {
        // open the tree at the current page
        tree.browse(a => {
          if (a.node.name.startsWith('folder 1') || a.node.name === 'file 1/1/1/1/2') {
              return true;
          }
          return false
        });
        success();
      });
    return p;
}

function setOpenTree(){
    let p = openTree();
    p.then(function() {
      treeIsOpen = true;
    });
}

setOpenTree()
