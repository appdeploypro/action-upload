import core from '@actions/core';
import github from '@actions/github';
import { openAsBlob } from 'node:fs';

const URL = 'https://api.appdeploypro.com/releases/upload';

async function main() {
  const token = core.getInput('token', { required: true });
  const file = core.getInput('file', { required: true });
  const branchName = github.context.payload.pull_request.head.ref;

  const formData = new FormData();
  formData.set("branchName", branchName);
  formData.set("binary", await openAsBlob(file))

  const opts = {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  };
  const response = await fetch(URL, opts);
  console.log(`Status: ${response.status}`);
}

main();
