import { AlertService } from './app/services/alert';
import { ComponentService } from './app/services/component';
import { run } from './app/app';
import './main.scss';

const alertService = new AlertService();
const componentService = new ComponentService();

run(alertService, componentService);