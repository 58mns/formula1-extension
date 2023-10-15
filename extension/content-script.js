async function wait(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

async function main() {
  //waiting so dom is fully loaded
  await wait(1000);

  //find video element
  let videoElement = null;
  let elementList = document.querySelectorAll(
    ".redbee-player-orientation-landscape"
  );
  videoElement = elementList[elementList.length - 1];

  //make new positions element
  let positionsElement = `<div class="formulaOverlay" style="width: 275px;height: 965px;position: absolute;z-index: 2147483647;top: 160px;left: 90px;display: flex;flex-direction: column;">
  <div class="noMax" style="width: 100%; height: 40px;background-color: #202024;"></div>

  <div class="iframeDiv" style="width: 40px;height: 925px;position: relative;">
      <img src="https://i.ibb.co/m6nWw8N/positions-Formula1-Test.png" alt="Positions" width="100%" height="100%">
  </div>

<div class="extraLayer" style="width: 100%;height: 55px;background-color: #202024;position: absolute;top: 0px;"></div>
</div>`;

  //add new element into video element
  videoElement.insertAdjacentHTML("beforeend", positionsElement);
}

function waitForAddedNode(params) {
  new MutationObserver(function (mutations) {
    var el = document.getElementsByClassName(params.classname)[0];
    if (el) {
      this.disconnect();
      params.done();
    }
  }).observe(document, {
    childList: true,
    subtree: true,
  });
}

waitForAddedNode({
  classname: "redbee-player-orientation-landscape",
  done: async function () {
    await main();
  },
});

//function waitForAddedNode(params) {
//   new MutationObserver(function (mutations) {
//     var el = document.getElementsByClassName(params.classname)[0];
//     if (el) {
//       this.disconnect();
//       params.done();
//     }
//   }).observe(params.parent || document, {
//     subtree: !!params.recursive || !params.parent,
//     childList: true,
//   });
// }

// waitForAddedNode({
//   classname: "redbee-player-orientation-landscape",
//   parent: document.querySelector(".redbee-player-container"),
//   recursive: false,
//   done: async function () {
//     await main();
//   },
// });
