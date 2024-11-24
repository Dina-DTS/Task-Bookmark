
                      /*****************************Declaration Variables***********************************/

var bookmarksArray;
var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var modelId = document.getElementById("modelId");
var BtnAdd = document.getElementById("submitBtn");
var BtnAUpdate = document.getElementById("updateBookmark");
var alertErr=document.getElementById("alertErr")
var updateIndex;

                  /***************************** Get Array From localStorage***********************************/

if (localStorage.getItem("BookMarksStorage") !== null) {
  bookmarksArray = JSON.parse(localStorage.getItem("BookMarksStorage"));
  displayBookmark(bookmarksArray);
} else {
  bookmarksArray = [];
}
               /***************************** Make Helper Function For Duplicate Name***********************************/

function isDuplicateName(name, bookmarksArray, excludeIndex = -1) {
  const lowerCaseName = name.toLowerCase();
  return bookmarksArray.some(
    (bookmark, index) => index !== excludeIndex && bookmark.name.toLowerCase() === lowerCaseName
  );
}

               /*****************************   Make Function exchangeContent *********************************************/

function updateStorage(){
  localStorage.setItem("BookMarksStorage", JSON.stringify(bookmarksArray));
  displayBookmark(bookmarksArray);
}        

               /*****************************   Make Function ClearInputs ********************************************/

function clearForm() {
  siteName.value = null;
  siteURL.value = null;
}

               /*****************************   Make Function AddBookmark *********************************************/

function addBookmark() {
  if (!validate(siteName) || !validate(siteURL)) {
    modelId.classList.remove("d-none");
    return;
  }

  if (isDuplicateName(siteName.value, bookmarksArray)) {
    alertErr.classList.remove('d-none');
    alertErr.innerHTML=`<strong>Warning!</strong> This website name already exists! Please choose a different name.`
    return;
  }

  const infoBookmark = {
    name: siteName.value,
    url: siteURL.value,
  };

  bookmarksArray.push(infoBookmark);
  updateStorage();
  clearForm();

}

               /*****************************   Make Function update BookMark *******************************************/

function updateBookmark() {
  if (!validate(siteName) || !validate(siteURL)) {
    modelId.classList.remove("d-none");
    return;
  }
  if (isDuplicateName(siteName.value, bookmarksArray, updateIndex)) {
     alertErr.classList.remove('d-none');
    alertErr.innerHTML=`<strong>Warning!</strong> This website name already exists! Please choose a different name.`
    return;
  }
  bookmarksArray[updateIndex].name = siteName.value;
  bookmarksArray[updateIndex].url = siteURL.value;
  updateStorage();
  clearForm();
  BtnAdd.classList.remove("d-none");
  BtnAUpdate.classList.add("d-none");
}

                 /*****************************   Make Function ValidateRegex ******************************************/

function validate(elm) {
  var regex = {
    bookmarkName: /^[A-Z][a-z]{3,15}$/,
    bookmarkURL:/^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(:[0-9]{1,5})?(\/[^\s]*)?$/,

  };

  var matched = regex[elm.id].test(elm.value);

  if (matched) {
    elm.classList.remove("is-invalid");
    elm.classList.add("is-valid");
    elm.nextElementSibling.classList.add("d-none");
  } else {
    elm.classList.remove("is-valid");
    elm.classList.add("is-invalid");
    elm.nextElementSibling.classList.remove("d-none");
  }
  return matched;
}

 
               /*****************************   Make Function CloseModal *********************************************/

function closeModal() {
  var btnClose = document.getElementById("modelId");
  btnClose.classList.add("d-none");
}

              /*****************************   Make Function Display BookMark ***************************************/

function displayBookmark(arr) {
  var contain = "";
  for (var i = 0; i < arr.length; i++) {
    contain += `
        <tr>
          <td>${i + 1}</td>
          <td>${arr[i].name}</td>
          <td>
            <a href="${
              arr[i].url
            }" target="_blank" class="btn btn-sm btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</a>
          </td>
          <td>
            <button onclick="deleteBookmark(${i})" class="btn btn-sm btn-danger "> <i class="fas fa-trash pe-2"></i>Delete</button>
          </td>
          <td>
            <button onclick="setFormForUpdate(${i})" class="btn btn-sm btn-warning "> <i class="fa-solid fa-pen pe-2"></i>Update</button>
          </td>
        </tr>
      `;
  }
  document.getElementById("tableContent").innerHTML = contain;
}

               /*****************************   Make Function Delete BookMark *********************************************/

function deleteBookmark(index) {
  bookmarksArray.splice(index, 1);
  updateStorage();
  
}
               /*****************************   Make Function setFormForUpdate *********************************************/

function setFormForUpdate(i) {
  updateIndex = i;
  BtnAdd.classList.add("d-none");
  BtnAUpdate.classList.remove("d-none");
  siteName.value = bookmarksArray[i].name;
  siteURL.value = bookmarksArray[i].url;
}



                    /******************************************** Done *******************************************************/
