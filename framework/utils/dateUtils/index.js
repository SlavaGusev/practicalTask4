const moment = require("moment");

const ISO_FORMAT = "YYYY/MM/DD";
const CALENDAR_FORMAT = "MM/DD/YYYY";
const YEARS = "years";

module.exports = class DateUtils {
  /**
   * Get current date in a calendar format
   * @returns {string} Current date {MM/DD/YYYY} format
   */
  static getCurrentDate() {
    return this.formatDateCalendar();
  }

  /**
   * Format date
   * @param {string} date Date
   * @param {string} format Format
   * @returns {string} Formatted date
   */
  static formatDate(date = moment(), format) {
    return moment(date).format(format);
  }

  /**
   * Format date to calendar format
   * @param {string} date Date
   * @returns {string} Formatted date
   */
  static formatDateCalendar(date = moment()) {
    return this.formatDate(date, CALENDAR_FORMAT);
  }

  /**
   * Sort array of dates in descending order
   * @param {Array<string>} array Array of dates
   * @returns {Array<string>} Array of dates sorted in descending order
   */
  static sortDateDesc(array) {
    return array.sort((a, b) => new Date(b) - new Date(a));
  }

  /**
   * Add years to current year
   * @param {number} yearStep Number of years to add
   * @returns {string} Current year + yearStep in {YYYY/MM/DD} format
   */
  static addYearsToCurrentYear(yearStep) {
    const newDate = moment().add(yearStep, YEARS);
    return this.formatDate(newDate, ISO_FORMAT);
  }

  /**
   * Generate random date between two dates
   * @param {string} lowerBound Lowest possible date
   * @param {string} upperBound Highest possible date
   * @returns {string} Random date
   */
  static randomDateBetweenBounds(lowerBound, upperBound) {
    const min = moment(lowerBound).valueOf();
    const max = moment(upperBound).valueOf();
    const date = Math.floor(Math.random() * (max - min + 1) + min);
    return this.formatDate(date, "YYYY/MM/DD");
  }
};
