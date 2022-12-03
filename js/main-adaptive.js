// Remove all grid-col-start-2 classes from all elements when reaching mobile view

function removeGridColStart2() {
    document.querySelectorAll('.grid-col-start-2').forEach((el) => {
        el.classList.remove('grid-col-start-2');
    });
}




