let response = await fetch('./bands.json')
let data = await response.json();

console.log(data);

function createTracks(band)
{ 
  let values = "";

  band.tracks.forEach((track) => 
    { 
      values += `<p class="trackInfo"><b>${track.name} - ${Math.trunc(track.duration / 60)}:${track.duration % 60}</b></p>`
    });
  
  return values;
}

function createLeft(band){
  return `
    <div class="bandInfo1 group" id="groupToDelete">
      <div class="images1">
        <img src="${band.icon != null && band.icon.length != 0 ? band.icon : "https://placehold.co/600x400?text=" + band.bandName}" class="images">
      </div>        
      <h2>${band.bandName}</h2>
    </div> `
}

function createRight(band){
  return `
          <div class="bandInfo2 group" id="groupToDelete"> 
             <button id="deleteButton">Delete group</button>
            <div class="soloist">
              <h2>Soloist: ${band.soloist}</h2>
            </div>
            <div>
              <p><b>${band.participants.join("<br>")}</b></p>
            </div>
            <div>
              <p><b>Songs:</b></p>
              <div class="add_track">
                <button class="main-btn">Add track</button> 
                    <form class="main-form">
                      <div id="add_track_id">
                      </div>                    
                      <button class="form-btn">Close</button>  
                    </form>    
              </div> 
                ${createTracks(band)}
            </div>
          </div>`;
}

function createItem(band, index){
  let htmlBlock = `<div class="bandInfo">`;

  if (index % 2 == 0) {
    htmlBlock += createLeft(band) + createRight(band);
  }else {
    htmlBlock += createRight(band) + createLeft(band);
  }

  htmlBlock += `</div>`;

  return htmlBlock;
}

const block = document.createElement('div');
block.classList.add('content');

block.innerHTML = data.map((band, index) => createItem(band, index)).join('');
document.body.appendChild(block);

// видалення картки
document.getElementById('deleteButton').addEventListener('click', function() {
  var group = document.getElementById('groupToDelete');
  if (group) {
      group.remove();
  }
});

// модальне вікно
let mainBtn = document.querySelector('.main-btn');
let mainForm = document.querySelector('.main-form');
let formBtn = document.querySelector('.form-btn');

mainBtn.addEventListener('click', () => {
  mainForm.classList.add('active');
});
// щоб браузер не оновлювався
formBtn.addEventListener('click', (e) => {
  e.preventDefault();
  mainForm.classList.remove('active');
});

// додавання треків в карточку групи
const container = document.getElementById('add_track_id');

const input1 = document.createElement('input');
input1.type = 'text';
input1.id = 'textInput1';
input1.placeholder = 'Track name';

const input2 = document.createElement('input');
input2.type = 'text';
input2.id = 'textInput2';
input2.placeholder = 'Track length';

const button = document.createElement('button');
button.innerText = 'Send';
button.addEventListener('click', displayText);

const output = document.createElement('div');
output.className = 'output';
output.id = 'output';

container.appendChild(input1);
container.appendChild(document.createElement('br'));
container.appendChild(input2);
container.appendChild(document.createElement('br'));
container.appendChild(button);
container.appendChild(output);

function displayText() {
    const text1 = document.getElementById('textInput1').value;
    const text2 = document.getElementById('textInput2').value;
    document.getElementById('output').innerText = `Track name: ${text1}, Track length: ${text2}`;
}

add_track_id.addEventListener('click', (e) => {
  e.preventDefault();
  mainForm.classList.remove('active');
});