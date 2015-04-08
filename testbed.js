document.getElementById('run-code').addEventListener('click', function (e) {
  var str = document.getElementById('js-code').value;

  str = str.replace(/arr\[(.+)\]\s+=\s+([^;}]+)/g, "changeVal($1, $2)");

  str = 'var arr = [25, 35, 2, 13, 45, 44]; function changeVal(index, newVal) { arr[index] = newVal; postMessage({index: index, newVal: newVal}); }; onmessage = function(e) { ' + str + ' };';

  var blob = new Blob([str]);

  // Obtain a blob URL reference to our worker 'file'.
  var blobURL = window.URL.createObjectURL(blob);

  var worker = new Worker(blobURL);
  worker.onmessage = function(e) {
    console.log(e.data);
  };
  worker.postMessage();
}, false);
