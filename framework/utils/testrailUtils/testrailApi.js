"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestrailApi = void 0;
const apiUtils = require("../apiUtils");
const { testrailConfig, } = require("../../../../configs/environment/testrailConfig");
const Logger = require("../../logger");
class TestrailApi extends apiUtils {
    constructor(headers = {}) {
        super(testrailConfig.baseUrl, headers);
    }
    /**
     * Get configuration parameters from testrailConfig
     * @return {Object} Auth object with username and password
     */
    get getConfig() {
        return {
            auth: {
                username: testrailConfig.email,
                password: testrailConfig.token,
            },
        };
    }
    /**
     * Add test run result for unique test case
     * @param {Number} runId Id of test run to add a new result
     * @param {Number} caseId Id of test case to add a new result
     * @param {Object} content Object with custom parameters to add a new result
     * @returns {Object} Testrail API response
     */
    addResultForCase(runId, caseId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger.info(`Adding autotest result to testrail run ${runId} for ${caseId} case id`);
            const response = yield this.postRequest(`add_result_for_case/${runId}/${caseId}`, content, this.getConfig);
            return response;
        });
    }
    /**
     * Add new test run for a project
     * @param {Number} projectId Id of a project to add a test run
     * @param {Object} content Object with custom parameters to add a new test run
     * @returns {Object} Testrail API response
     */
    addNewTestRun(projectId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger.info(`Adding new test run for project with id: ${projectId}`);
            const response = yield this.postRequest(`add_run/${projectId}`, content, this.getConfig);
            return response;
        });
    }
    /**
     * Add new test case for a section
     * @param {Number} sectionId Id of section inside test suite to add a new test case
     * @param {Object} content Object with custom parameters to add a new test run
     * @returns {Object} Testrail API response
     */
    addNewTestCase(sectionId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger.info(`Adding new test case for section with id: ${sectionId}`);
            const response = yield this.postRequest(`add_case/${sectionId}`, content, this.getConfig);
            return response;
        });
    }
    /**
     * Add attachment to test run result
     * @param {Number} resultId Id of test run result (can be found in addResultForCase response body)
     * @param {FormData} content FormData object with attachment parameter
     * @returns {Object} Testrail API response
     */
    addAttachmentToResult(resultId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger.info(`Adding attachment to the test run result with id: ${resultId}`);
            const response = yield this.postRequest(`add_attachment_to_result/${resultId}`, content, this.getConfig);
            return response;
        });
    }
    /**
     * Get test plans of the project
     * @param {Number} projectId Id of project
     * @returns {Object} Testrail API response
     */
    getPlans(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger.info(`Getting test plans of the project with id: ${projectId}`);
            const response = yield this.getRequest(`get_plans/${projectId}`, this.getConfig);
            return response;
        });
    }
    /**
     * Add a new plan for a project
     * @param {Number} projectId Id of a project to add a test plan
     * @param {Object} content Object with custom parameters to add a new plan
     * @returns {Object} Testrail API response
     */
    addNewPlan(projectId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger.info(`Adding a new plan for a project with id: ${projectId}`);
            const response = yield this.postRequest(`add_plan/${projectId}`, content, this.getConfig);
            return response;
        });
    }
    /**
     * Add new plan entry for a plan
     * @param {Number} planId Id of a test plan
     * @param {Object} content Object with custom parameters to add a new plan entry
     * @returns {Object} Testrail API response
     */
    addNewPlanEntry(planId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger.info(`Adding a new plan entry for a test plan with id: ${planId}`);
            const response = yield this.postRequest(`add_plan_entry/${planId}`, content, this.getConfig);
            return response;
        });
    }
}
exports.TestrailApi = TestrailApi;
