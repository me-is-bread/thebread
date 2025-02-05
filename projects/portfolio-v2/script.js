var pageCount = 0;

var _blockItem = document.getElementsByName("block-items");
var _navItem = document.getElementsByName("nav-item");
const _navItemArray = Array.from(_navItem);
console.log(_blockItem.length)

document.body.onclick = function (event) {
    if (window.navigator.userAgent.indexOf("Android") != -1) {
        if (pageCount == _blockItem.length - 1) {
            _blockItem[pageCount].style.display = "none";
            pageCount = 0;
            _blockItem[pageCount].style.display = "block";
            return;
        }
        _blockItem[pageCount].style.display = "none";
        pageCount = pageCount + 1;
        _blockItem[pageCount].style.display = "block";
    }
}

document.body.onload = function() {
    _navItem[0].classList.add("selected");
    _blockItem.forEach(element => {
        element.style.display = "none";
    });
    _blockItem[0].style.display = "block";
}

_navItem.forEach(element => {
    element.addEventListener('click', function(event) {
        var blockNum = _navItemArray.indexOf(element);
        console.log(blockNum);
        for (var i=0; i < _navItem.length; i++) {
            if(_navItem[i].classList.contains("selected")) {
                _navItem[i].classList.remove("selected");
            }
        }
        for (var i=0; i < _blockItem.length; i++) {
            if(_blockItem[i].style.display == "block") {
                _blockItem[i].style.display = "none";
            }
        }
        _blockItem[blockNum].style.display = "block";
        event.target.classList.add("selected")
    });
    
});