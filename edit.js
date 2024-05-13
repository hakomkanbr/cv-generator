const StorageKeyName = "cv_data";
const obj = {};
// _____START GET AND WRITE____
// Get All Data From Local Storage
const jsonData = JSON.parse(localStorage.getItem(StorageKeyName) ?? "{}");

const distributionToHtml = (data) => {
  // Get All EditableContent Has Attr (data-name)
  const elements = document.querySelectorAll("[data-name]");
  elements.forEach((e) => {
    // Get Attr Value
    const attr = e.getAttribute("data-name");

    if (attr == "file") {
      e.setAttribute("style", `background-image:url(${data[attr]})`);
    } else if (data[attr]) {
      // Search In Object By Key Attr Name and If Not Found Not Take Any Thing
      e.innerHTML = data[attr];
    }
  });
};
// _____END GET AND WRITE____

// ____START ON CHANGE TO EVERY INPUT____
document.addEventListener(
  "keyup",
  function (event) {
    var esc = event.which == 27,
      nl = event.which == 13,
      el = event.target,
      input = el.nodeName != "INPUT" && el.nodeName != "TEXTAREA";

    if (input) {
      if (esc) {
        // restore state
        document.execCommand("undo");
        el.blur();
      } else {
        console.warn(el.innerHTML);
        // save
        obj[el.getAttribute("data-name")] = el.innerHTML;
      }
    }
  },
  true
);
// ____END ON CHANGE TO EVERY INPUT____

// ____START SAVE DATA____
const saveData = () => {
  const saveBtn = document.getElementById("save");

  saveBtn.onclick = function () {
    localStorage.setItem(
      StorageKeyName,
      JSON.stringify({ ...jsonData, ...obj })
    );
    alert("Bilgiler SaklandÄ±");
  };
};
// ____END SAVE DATA____

// ____START File UPLOAD____
const fileUpload = () => {
  var fileUpload = document.getElementById("file-upload");
  fileUpload.onchange = async function (e) {
    const file = e.target.files[0];
    const image = await toBase64(file);
    obj[fileUpload.getAttribute("name")] = image;
  };
};
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
// ____END File UPLOAD____

// init
distributionToHtml(jsonData);
fileUpload();
saveData();
