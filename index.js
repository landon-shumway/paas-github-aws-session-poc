const core = require("@actions/core");

async function getAwsCreds() {
  const audience = "sts.amazonaws.com";
  const aws_id_token = await core.getIDToken(audience);

  const roleArn = core.getInput("role-arn");

  console.log(roleArn);
  console.log(oidcToken);

  return aws_id_token;
}

try {
  getAwsCreds();
} catch (error) {
  core.setFailed(error.message);
}
