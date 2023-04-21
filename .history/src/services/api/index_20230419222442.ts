// import { API_URL, API_VERSION } from '';
//TODO: Change the API_URL and API_VERSION from the .env file

// const API = "https://cors-anywhere.herokuapp.com/http://localhost:3000";
const API = "http://localhost:3000";
// const VERSION = API_VERSION;

const endPoints = {
  stores: {
    create: `${API}/stores`,
    get: (storesId: any) => `${API}/stores/${storesId}`,
    update: (storesId: any) => `${API}/stores/${storesId}`,
    withinDistance: {
      get: `${API}/stores/within/distance`,
    },
    withinDistanceAndName: {
      get: `${API}/stores/within/distance/name`,
    },
  },
  //   courses: {
  //     create: `${API}/api/${VERSION}/courses`,
  //     get: (courseId) => `${API}/api/${VERSION}/courses/${courseId}`,
  //     update: (courseId) => `${API}/api/${VERSION}/courses/${courseId}`,
  //     delete: (courseId) => `${API}/api/${VERSION}/courses/${courseId}`,
  //     getCourseMembers: (courseId) =>
  //       `${API}/api/${VERSION}/courses/${courseId}/members`,
  //     all: `${API}/api/${VERSION}/courses/all`,
  //     me: {
  //       read: `${API}/api/${VERSION}/courses/me`,
  //     },
  //   },
  //   teams: {
  //     create: (courseId) => `${API}/api/${VERSION}/courses/${courseId}/teams`,
  //     get: (courseId, teamId) =>
  //       `${API}/api/${VERSION}/courses/${courseId}/teams/${teamId}`,
  //     update: (courseId, teamId) =>
  //       `${API}/api/${VERSION}/courses/${courseId}/teams/${teamId}`,
  //     delete: (courseId, teamId) =>
  //       `${API}/api/${VERSION}/courses/${courseId}/teams/${teamId}`,
  //     all: (courseId) => `${API}/api/${VERSION}/courses/${courseId}/teams/all`,
  //   },
};

export default endPoints;
