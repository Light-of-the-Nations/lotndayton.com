const PROJECT_ID = 'r94v9owx';
const DATASET = 'production';
const PAGE_NAME = 'give';
const QUERY = encodeURIComponent(`*[_type == "${PAGE_NAME}"]{
  _id,
  mainHeadline,
  mainText,
  leftSubheadline,
  leftText,
  rightSubheadline,
  rightText,
  paypalButtonText
}`);

const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const mainHeadlineContainer = document.querySelector('#mainHeadlineContainer');
const mainTextContainer = document.querySelector('#mainTextContainer');
const leftSubheadlineContainer = document.querySelector(
  '#leftSubheadlineContainer',
);
const leftTextContainer = document.querySelector('#leftTextContainer');
const rightSubheadlineContainer = document.querySelector(
  '#rightSubheadlineContainer',
);
const rightTextContainer = document.querySelector('#rightTextContainer');
const paypalButtonTextContainer = document.querySelector(
  '#paypalButtonTextContainer',
);

fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result.find((obj) => obj?._id === PAGE_NAME);
    const {
      mainHeadline,
      mainText,
      leftSubheadline,
      rightSubheadline,
      leftText,
      rightText,
      paypalButtonText,
    } = page;

    mainHeadlineContainer.innerText = mainHeadline;
    sanityBlockContent(mainTextContainer, mainText);
    leftSubheadlineContainer.innerText = leftSubheadline;
    sanityBlockContent(leftTextContainer, leftText);
    rightSubheadlineContainer.innerText = rightSubheadline;
    sanityBlockContent(rightTextContainer, rightText);
    paypalButtonTextContainer.innerText = paypalButtonText;
  });
