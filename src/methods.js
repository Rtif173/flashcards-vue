export function readFileUrl(file) {
  return new Promise((resolve, reject) => {
    var fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result)
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}
export function readFileText(file) {
  return new Promise((resolve, reject) => {
    var fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result)
    };
    fr.onerror = reject;
    fr.readAsText(file);
  });
}

export function defineFileType(file) {
  if (!file) {
    return null
  }
  const fileTypeByExtension = {
    jpg: "image",
    png: "image",
    md: "markdown"
  }
  const fullFileName = file.name;
  const extension = fullFileName.split(".").pop();
  console.log(extension);
  if (fileTypeByExtension[extension]) {
    return fileTypeByExtension[extension]
  } else {
    console.log("unknown type")
  }
}

export function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function splitStingByLast(str, splitString) {
  const arr = str.split(splitString);
  const lastPart = arr.pop();
  const firstPart = arr.join(splitString);
  return [firstPart, lastPart]
}

export function isFileInFileArray(fileToCheck, fileArray) {
  for (const file of fileArray) {
    if (
      file.name == fileToCheck.name &&
      file.size == fileToCheck.size &&
      file.lastModified == fileToCheck.lastModified
    ) {
      return true
    }
  }
  return false
}