// Setting timer in banner
const second = 1000,
   minute = second * 60,
   hour = minute * 60,
   day = hour * 24;
const timeMins = 63.16666;
let endTime = new Date(new Date().getTime() + timeMins * 60000);
let x = setInterval(function () {
   let now = new Date().getTime();
   let distance = endTime - now;
   if (distance < 1000) {
      endTime = new Date(new Date().getTime() + timeMins * 60000);
   }
   document.getElementById('hour').innerText = Math.floor((distance / (1000 * 60 * 60)) % 24);
   document.getElementById('minutes').innerText = Math.floor((distance / 1000 / 60) % 60);
   document.getElementById('seconds').innerText = Math.floor((distance / 1000) % 60);
}, second);

// Dynamically render data from JSON
const tableBody = document.getElementById("table-body");
const jsonUrl = 'cart.json';

window.addEventListener('DOMContentLoaded', () => {
   loadData();
});

const loadData = () => {
   fetch(jsonUrl)
   .then(response => response.json())
   .then(data => {
      getData(data);
   });
}
let output = "";
let serialNum = 0;
let sum = 0;
const getData = (arr) => {
   arr.forEach(element => {
      serialNum++;
      sum += parseFloat(element.discountedPrice.slice(1,6));
      output += `
         <tr class="product-row">
            <td>
               <strong id="serial-num">${serialNum}</strong>
            </td>
            <td>
               <div class="product-desc">
                  <a href="" id="product-name">${element.productName}</a>
                  <span id="file-type">${element.fileType}</span>
                  <span id="product-type">${element.productType}</span>
                  <div class="options-holder">
                     <label for="options">Get new questions updates for: </label>
                     <select name="options" id="options">
                        <option value="30day" selected>30 Days (Free)</option>
                        <option value="60day">60 Days ($2.99)</option>
                        <option value="90day">90 Days ($3.99)</option>
                     </select>
                  </div>
               </div>
            </td>
            <td>
               <div class="price-holder">
                  <span id="actual-price">${element.actualPrice}</span>
                  <span id="discounted-price">${element.discountedPrice}</span>
                  <div class="savings">
                     <span>Saved 10% Off</span>
                  </div>
               </div>
            </td>
            <td>
               <button onclick="removeItem(this)">Remove</button>
            </td>
         </tr>
      `;
   });
   document.getElementById("table-body").innerHTML = output;
   sum = sum.toFixed(2);
   document.getElementById("subtotal").innerHTML = "$"+sum;
}

const removeItem = (element) => {
   var i = element.parentNode.parentNode.rowIndex;
   var x = document.getElementById("cart-table").rows[i].cells[2].children[0].children[1].innerHTML;
   sum -= parseFloat(x.slice(1, 6));
   sum = sum.toFixed(2);
   serialNum--;
   document.getElementById("subtotal").innerHTML = "$" + sum;
   document.getElementById("cart-table").deleteRow(i);
   if (serialNum == 0) {
      document.getElementById("review-body").style.display = "none";
      document.getElementById("no-items-available").style.display = "flex";
   }
}