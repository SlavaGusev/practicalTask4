const apiUtils = require("../apiUtils");
const {
  testrailConfig,
} = require("../../../../configs/environment/testrailConfig");
const Logger = require("../../logger");
import { testPriority } from "./testPriority";
import { testrailStatus } from "./testrailStatus";
import { testType } from "./testType";

export class TestrailApi extends apiUtils {
  constructor(headers = {}) {
    super(testrailConfig.baseUrl, headers);
  }

  /**
   * Get configuration parameters from testrailConfig
   * @return {Object} Auth object with username and password
   */
  get getConfig(): { auth: { username: String; password: String } } {
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
  async addResultForCase(
    runId: number,
    caseId: number,
    content: {
      status_id: testrailStatus;
      comment: string;
      version?: number;
      defects?: number;
      assignedTo?: number;
      custom_step_results?: Array<Object>;
    }
  ): Promise<object> {
    Logger.info(
      `Adding autotest result to testrail run ${runId} for ${caseId} case id`
    );
    const response = await this.postRequest(
      `add_result_for_case/${runId}/${caseId}`,
      content,
      this.getConfig
    );
    return response;
  }

  /**
   * Add new test run for a project
   * @param {Number} projectId Id of a project to add a test run
   * @param {Object} content Object with custom parameters to add a new test run
   * @returns {Object} Testrail API response
   */
  async addNewTestRun(
    projectId: number,
    content: {
      suite_id?: number;
      name: string;
      description?: number;
      milestone_id?: number;
      assignedto_id?: number;
      include_all: boolean;
      case_ids?: Array<string>;
      refs: String;
    }
  ): Promise<object> {
    Logger.info(`Adding new test run for project with id: ${projectId}`);
    const response = await this.postRequest(
      `add_run/${projectId}`,
      content,
      this.getConfig
    );
    return response;
  }

  /**
   * Add new test case for a section
   * @param {Number} sectionId Id of section inside test suite to add a new test case
   * @param {Object} content Object with custom parameters to add a new test run
   * @returns {Object} Testrail API response
   */
  async addNewTestCase(
    sectionId: number,
    content: {
      section_id?: number;
      title: string;
      template_id?: number;
      type_id: testType;
      priority_id: testPriority;
      milestone_id?: number;
      refs: string;
      custom_steps_separated?: Array<Object>;
    }
  ): Promise<object> {
    Logger.info(`Adding new test case for section with id: ${sectionId}`);
    const response = await this.postRequest(
      `add_case/${sectionId}`,
      content,
      this.getConfig
    );
    return response;
  }

  /**
   * Add attachment to test run result
   * @param {Number} resultId Id of test run result (can be found in addResultForCase response body)
   * @param {FormData} content FormData object with attachment parameter
   * @returns {Object} Testrail API response
   */
  async addAttachmentToResult(
    resultId: number,
    content: FormData
  ): Promise<object> {
    Logger.info(
      `Adding attachment to the test run result with id: ${resultId}`
    );
    const response = await this.postRequest(
      `add_attachment_to_result/${resultId}`,
      content,
      this.getConfig
    );
    return response;
  }

  /**
   * Get test plans of the project
   * @param {Number} projectId Id of project
   * @returns {Object} Testrail API response
   */
  async getPlans(projectId: number): Promise<object> {
    Logger.info(`Getting test plans of the project with id: ${projectId}`);
    const response = await this.getRequest(
      `get_plans/${projectId}`,
      this.getConfig
    );
    return response;
  }

  /**
   * Add a new plan for a project
   * @param {Number} projectId Id of a project to add a test plan
   * @param {Object} content Object with custom parameters to add a new plan
   * @returns {Object} Testrail API response
   */
  async addNewPlan(
    projectId: number,
    content: {
      name: string;
      description?: number;
      milestone_id?: number;
      entries?: Array<Object>;
    }
  ): Promise<object> {
    Logger.info(`Adding a new plan for a project with id: ${projectId}`);
    const response = await this.postRequest(
      `add_plan/${projectId}`,
      content,
      this.getConfig
    );
    return response;
  }

  /**
   * Add new plan entry for a plan
   * @param {Number} planId Id of a test plan
   * @param {Object} content Object with custom parameters to add a new plan entry
   * @returns {Object} Testrail API response
   */
  async addNewPlanEntry(
    planId: number,
    content: {
      suite_id?: number;
      name: string;
      description?: number;
      assignedto_id?: number;
      include_all: boolean;
      case_ids?: Array<string>;
      config_ids?: Array<string>;
      refs?: Array<string>;
      runs?: Array<string>;
    }
  ): Promise<object> {
    Logger.info(`Adding a new plan entry for a test plan with id: ${planId}`);
    const response = await this.postRequest(
      `add_plan_entry/${planId}`,
      content,
      this.getConfig
    );
    return response;
  }
}
