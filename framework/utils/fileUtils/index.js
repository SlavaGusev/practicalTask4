const Logger = require("../../logger");
const fs = require("fs");
const timeouts = require("../../../configs/environment/timeouts");
const path = require("path");

module.exports = class FileUtils {
  /**
   * Get newest file
   * @param {Array<string>} files Files names
   * @param {string} dir Directory
   * @returns {string} Newest file
   */
  static getNewestFile(files, dir) {
    Logger.info(`Get the newest file from ${files} in ${dir}`);
    const out = [];
    for (const file of files) {
      const path = `${dir}/${file}`;
      const stats = fs.statSync(path);
      out.push({ file: file, mtime: stats.mtime.getTime() });
    }
    out.sort((a, b) => b.mtime - a.mtime);
    return out.length > 0 ? out[0].file : "";
  }

  /**
   * Get files from directory
   * @param {string} dir Directory
   * @returns {Array<string>} Files
   */
  static getFilesFromDir(dir) {
    Logger.info(`Get file names from in ${dir}`);
    return fs.readdirSync(dir);
  }

    /**
   * Delete file from directory
   * @param {string} dir Directory
   */
     static deleteFile(dir, filename) {
      Logger.info(`Delete file from ${dir}`);
      return fs.unlinkSync(path.join(dir, filename));
    }

  /**
   * Read file line
   * @param {string} dir Directory
   * @param {string} encoding Encoding
   * @returns {string} File line
   */
  static readFileLine(dir, encoding = "utf-8") {
    Logger.info(`Read line in ${dir}`);
    return fs.readFileSync(dir, encoding).split("\n");
  }

  /**
   * Check if file exists
   * @param {string} dir Directory
   * @returns {boolean} true if exists else false
   */
  static isFileExists(dir) {
    Logger.info(`Is a file located by the path ${dir}`);
    return fs.existsSync(dir);
  }

  /**
   * Check if directory is file
   * @param {string} dir Directory
   * @param {string} subName Sub-name of file
   * @returns {boolean} true if file else false
   */
  static isFile(dir, subName) {
    Logger.info(`Is a file.`);
    const files = this.getFilesFromDir(dir);
    return files.filter((el) => el.includes(subName)).length === 0;
  }

  /**
   * Get file from directory
   * @param {string} dir Directory
   * @param {RegExp} regex
   * @returns {Array<string>} Files
   */
  static getFilesFromDirByName(dir, regex) {
    Logger.info(`Get file names from in ${dir}`);
    const files = this.getFilesFromDir(dir);
    return files.filter((el) => el.match(regex));
  }

  /**
   * Wait for file with extension to exist
   * @param {string} path Path to the file
   * @param {string} extension Extension of the file
   * @param {number} timeout Timeout for waiter
   * @param {number} interval Interval for checks
   * @returns {Promise<boolean>} true if the file exists, else false
   */
  static async waitForFilesWithExtension(
    path,
    extension,
    timeout = timeouts.fileDownload,
    interval = timeouts.polling
  ) {
    return new Promise(function (resolve) {
      let timer = 0;
      setInterval(() => {
        const fileNames = fs.readdirSync(path);
        const fileExists =
          fileNames
            .map((fileName) => fileName.toLowerCase())
            .filter((fileName) => fileName.endsWith(extension.toLowerCase()))
            .length != 0;

        if (fileExists) {
          resolve(true);
        }

        timer += interval;
        if (timer >= timeout) {
          resolve(false);
        }
      }, interval);
    });
  }
};
