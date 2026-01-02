const uploadArea = document.getElementById("uploadArea");
const mediaInput = document.getElementById("mediaInput");
const previewArea = document.getElementById("previewArea");
const imagePreview = document.getElementById("imagePreview");
const videoPreview = document.getElementById("videoPreview");
const removeMedia = document.getElementById("removeMedia");
const fileName = document.getElementById("fileName");
const fileSize = document.getElementById("fileSize");
const textarea = document.getElementById("content");
const charCount = document.getElementById("charCount");

textarea.addEventListener("input", () => {
    charCount.textContent = textarea.value.length;
});

uploadArea.addEventListener("click", () => {
    mediaInput.click();
});

uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("border-blue-600");
});

uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("border-blue-600");
});

uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("border-blue-600");
    handleFile(e.dataTransfer.files[0]);
});

mediaInput.addEventListener("change", () => {
    if (mediaInput.files.length > 0) {
        handleFile(mediaInput.files[0]);
    }
});

function handleFile(file) {
    if (!file) return;

    const url = URL.createObjectURL(file);
    previewArea.classList.remove("hidden");
    uploadArea.classList.add("hidden");

    fileName.textContent = file.name;
    fileSize.textContent = `${(file.size / 1024 / 1024).toFixed(2)} MB`;

    // Reset previews
    imagePreview.classList.add("hidden");
    videoPreview.classList.add("hidden");

    if (file.type.startsWith("image/")) {
        imagePreview.src = url;
        imagePreview.classList.remove("hidden");
    } else if (file.type.startsWith("video/")) {
        videoPreview.src = url;
        videoPreview.classList.remove("hidden");
    }
};

removeMedia.addEventListener("click", () => {
    mediaInput.value = "";
    previewArea.classList.add("hidden");
    uploadArea.classList.remove("hidden");
    imagePreview.src = "";
    videoPreview.src = "";
});