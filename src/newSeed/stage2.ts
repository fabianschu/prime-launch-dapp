import { BaseStage } from "newSeed/baseStage";
import { Utils } from "services/utils";

export class Stage2 extends BaseStage {
  private isValidFile(file: string): boolean {
    const re = /(\.jpg|\.bmp|\.gif|\.png)$/i;
    return re.test(String(file).toLowerCase());
  }

  async proceed(): Promise<void> {
    const message: string = await this.validateInputs();
    if (message) {
      this.validationError(message);
    } else {
      this.next();
    }
  }

  validateInputs(): Promise<string> {
    let message: string;
    if (!this.seedConfig.projectDetails.summary) {
      message = "Please enter a value for Project Summary";
    } else if (!this.seedConfig.projectDetails.proposition) {
      message = "Please enter a value for Value Proposition";
    } else if (!this.seedConfig.projectDetails.teamDescription) {
      message = "Please enter a value for Team Description";
    } else if (!Utils.isValidUrl(encodeURI(this.seedConfig.projectDetails.logo))) {
      message = "Please enter a valid URL for Project Logo";
    }
    else if (!this.isValidFile(this.seedConfig.projectDetails.logo)) {
      message = "Please supply a valid image file type for Project Logo";
    }
    this.stageState.verified = !message;
    return Promise.resolve(message);
  }
}
