/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 450:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 848:
/***/ ((module) => {

module.exports = eval("require")("node-fetch");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(450);
const fetch = __nccwpck_require__(848);

async function getJwt() {
  const { ACTIONS_ID_TOKEN_REQUEST_TOKEN, ACTIONS_ID_TOKEN_REQUEST_URL } =
    process.env;
  const resp = await fetch(`${ACTIONS_ID_TOKEN_REQUEST_URL}`, {
    headers: { Authorization: `bearer ${ACTIONS_ID_TOKEN_REQUEST_TOKEN}` },
  });

  const { value } = await resp.json();
  return value;
}

(async () => {
  const apiUrl = "https://jzlk6rq61h.execute-api.us-east-1.amazonaws.com";
  const roleArn = core.getInput("roleArn", { required: true });
  const transitiveTags = core.getInput("transitiveTags");
  const jwt = await getJwt();

  const resp = await fetch(apiUrl, {
    headers: {
      "ghaoidc-role-arn": roleArn,
      "ghaoidc-transitive-tags": transitiveTags,
      authorization: jwt,
    },
  });


  const body = await resp.json();

  const { AccessKeyId, SecretAccessKey, SessionToken } = body.Credentials;

  core.setSecret(SecretAccessKey);
  core.setSecret(SessionToken);

  core.exportVariable("AWS_ACCESS_KEY_ID", AccessKeyId);
  core.exportVariable("AWS_SECRET_ACCESS_KEY", SecretAccessKey);
  core.exportVariable("AWS_SESSION_TOKEN", SessionToken);
  core.exportVariable("AWS_REGION", "us-east-1");

  core.setOutput("AWS_ACCESS_KEY_ID", AccessKeyId);
  core.setOutput("AWS_SECRET_ACCESS_KEY", SecretAccessKey);
  core.setOutput("AWS_SESSION_TOKEN", SessionToken);
  core.setOutput("AWS_REGION", "us-east-1");
})();

})();

module.exports = __webpack_exports__;
/******/ })()
;