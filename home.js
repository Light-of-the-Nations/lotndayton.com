const PROJECT_ID = 'r94v9owx';
const DATASET = 'production';
const PAGE_NAME = 'home';
const QUERY = encodeURIComponent(`*[_type == "${PAGE_NAME}"]{
  _id,
  bannerHeadline,
  bannerHeadlineBreak,
  bannerScriptureReading,
  bannerScriptureCitation,
  bannerText,
  eventsHeadline
  }`);

const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const bannerHeadlineContainer = document.querySelector(
  '#bannerHeadlineContainer',
);
const bannerScriptureReadingContainer = document.querySelector(
  '#bannerScriptureReadingContainer',
);
const bannerScriptureCitationContainer = document.querySelector(
  '#bannerScriptureCitationContainer',
);
const bannerTextContainer = document.querySelector('#bannerTextContainer');
const eventsHeadlineContainer = document.querySelector(
  '#eventsHeadlineContainer',
);

fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    console.log(result);
    const page = result.find((obj) => obj?._id === PAGE_NAME);
    const {
      bannerHeadline,
      bannerHeadlineBreak,
      bannerScriptureReading,
      bannerScriptureCitation,
      bannerText,
      eventsHeadline,
    } = page;

    let bannerHeadlineInsertion = `<span>${bannerHeadline}</span>`;
    if (bannerHeadlineBreak) {
      bannerHeadlineInsertion += `<span>${bannerHeadlineBreak}</span>`;
    }
    bannerHeadlineContainer.innerHTML = bannerHeadlineInsertion;

    bannerScriptureReadingContainer.innerText = bannerScriptureReading;
    bannerScriptureCitationContainer.innerText = bannerScriptureCitation;

    sanityBlockContent(bannerTextContainer, bannerText);

    eventsHeadlineContainer.innerText = eventsHeadline;
  });
