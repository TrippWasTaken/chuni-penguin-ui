// run this once to get all static files from your chunithm folder

const fs = require("fs-extra");
const path = require("path");
const recursive = require("recursive-readdir");
const { execSync } = require("child_process");

const CHUNI_DIR = "D:/games/ChuniLuminous/";
const CHUNI_UI_DIR = "C:/Programming/chuni-penguin-ui/public/static";

async function copyFilesWithExtension(sourceFolder, destFolder, extension) {
  try {
    const files = await recursive(sourceFolder);
    const filteredFiles = files.filter(
      (file) => path.extname(file) === extension && file.includes("CHU_UI")
    );

    for (const file of filteredFiles) {
      try {
        const output = `${destFolder}/${path
          .basename(file)
          .replace(/\.[^/.]+$/, ".png")}`;
        const convert = `ffmpeg -y -i "${file}" -update true "${output}"`;
        console.log(file);
        execSync(convert);
      } catch (err) {
        console.log("continuing", err);
      }
    }
    console.log("Copy complete!");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

copyFilesWithExtension(CHUNI_DIR, CHUNI_UI_DIR, ".dds");
