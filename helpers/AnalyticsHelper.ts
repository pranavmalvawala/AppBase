import ReactGA from "react-ga4";
import { CommonEnvironmentHelper } from "./CommonEnvironmentHelper";

export class AnalyticsHelper {

  static init = () => {
    if (CommonEnvironmentHelper.GoogleAnalyticsTag !== "" && typeof(window)!=="undefined") {
      ReactGA.initialize([{trackingId: CommonEnvironmentHelper.GoogleAnalyticsTag}]);
      AnalyticsHelper.logPageView();
    }
  }

  static logPageView = () => {
    if (CommonEnvironmentHelper.GoogleAnalyticsTag !== "" && typeof(window)!=="undefined") {
      ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
    }
  }

  static logEvent = (category: string, action: string, label?:string) => {
    if (CommonEnvironmentHelper.GoogleAnalyticsTag !== "" && typeof(window)!=="undefined") {
      ReactGA.event({ category, action, label });
    }
  }

}
