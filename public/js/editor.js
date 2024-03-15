const save = document.querySelector("#save");
const title = document.querySelector("#title");
const image = document.querySelector("#image");
function displaySave() {
  if (save && save.classList.contains("hidden")) {
    save.classList.remove("hidden");
  }
}

if (title) {
  title.addEventListener("change", () => {
    displaySave();
  });
}

if (image) {
  image.addEventListener("change", () => {
    displaySave();
  });
}

const editor = new EditorJS({
  holder: "editor",
  ...(blogData && { data: blogData }),
  placeholder: "Write your amazing blog here!",
  tools: {
    header: {
      class: Header,
      config: {
        placeholder: "Header",
      },
    },
    list: {
      class: List,
      inlineToolbar: true,
      config: {
        defaultStyle: "unordered",
      },
    },
    code: CodeTool,
    table: Table,
    marker: Marker,
    embed: Embed,
    underline: Underline,
  },
  readOnly: readOnly,
  onChange: (api, event) => {
    if (save) {
      displaySave();
    }
  },
});

if (save) {
  save.addEventListener("submit", async (e) => {
    e.preventDefault();
    const titleInput = title;
    titleInput.classList.add("hidden");
    const dataInput = document.createElement("input");
    const data = await editor.save();
    dataInput.classList.add("hidden");
    dataInput.name = "data";
    dataInput.value = JSON.stringify(data);
    const imageInput = image;
    imageInput.classList.add("hidden");
    save.append(imageInput);
    save.append(titleInput);
    save.append(dataInput);
    save.submit();
  });
}
