import { inputsAreValid } from './utils/inputs-are-valid';
import { parseInputs } from './utils/parse-inputs';

export const run = (alertService, componentService) => {
  alertService.hideErrors();

  componentService.handleClick(() => {
    alertService.hideErrors();
    const inputs = componentService.getInputs();
    const parsedInputs = parseInputs(...inputs);
    if (inputsAreValid(...parsedInputs)) {
      const [numA, numB] = parsedInputs;
      componentService.setResult(numA + numB);
    }
    else {
      componentService.setResult('');
      alertService.handleAdditionError(inputs, parsedInputs);
    }
  });
};