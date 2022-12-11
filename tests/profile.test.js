import React from 'react';
import TestRenderer from 'react-test-renderer';
import ItemComponent from "./components/Item/index.js";

let getItemsRequestTimestamp, getCommentsRequestTimestamp = null;

jest.mock("frontend/src/agent.js", () => {
  return {
    Items: {
      get: async () => {
        getItemsRequestTimestamp = Date.now().getTime();
        await wait(2000);
      }
    },
    Comments: {
      forItem: async () => {
        getCommentsRequestTimestamp = Date.now().getTime();
        await wait(2000);
      }
    }
  }
});


test("ItemComponent requests item and comments data at the same time", () => {
  const renderer = TestRenderer.create(<ItemComponent />);
  expect(renderer.root.instance.componentDidMount).toHaveBeenCalled();
  expect(getItemsRequestTimestamp).to eq(getCommentsRequestTimestamp)
})

async function wait(timeInMilliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeInMilliseconds);
  });
}
