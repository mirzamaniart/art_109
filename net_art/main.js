document.querySelectorAll('.preview-sticker').forEach(preview => {
    preview.addEventListener('click', e => {
      const src = preview.getAttribute('data-src');
      const newSticker = document.createElement('img');
      newSticker.src = src;
      newSticker.className = 'draggable-sticker';
      newSticker.style.left = '250px'; // start near the panel
      newSticker.style.top = '150px';
      document.getElementById('scrapbook').appendChild(newSticker);
      makeDraggable(newSticker);
    });
  });
  
  function makeDraggable(sticker) {
    sticker.addEventListener('mousedown', function(e) {
      e.preventDefault();
      let shiftX = e.clientX - sticker.getBoundingClientRect().left;
      let shiftY = e.clientY - sticker.getBoundingClientRect().top;
  
      function onMouseMove(e) {
        sticker.style.left = e.pageX - shiftX + 'px';
        sticker.style.top = e.pageY - shiftY + 'px';
      }
  
      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
  
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  
    sticker.ondragstart = () => false;
  }
  