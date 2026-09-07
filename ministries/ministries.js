const PROJECT_ID = 'r94v9owx';
const DATASET = 'production';
const PAGE_NAME = 'ministries';
const QUERY = encodeURIComponent(`*[_type == "${PAGE_NAME}"]{
  _id,
  mainHeadline,
  mainText,
  individualMinistries[] {
      name,
      mainText,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    },
  }`);

const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const mainHeadlineContainer = document.querySelector('#mainHeadlineContainer');
const mainTextContainer = document.querySelector('#mainTextContainer');
const ministiresContainer = document.querySelector('#ministriesContainer');

fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result.find((obj) => obj?._id === PAGE_NAME);
    const { mainHeadline, mainText, individualMinistries } = page;

    mainHeadlineContainer.innerText = mainHeadline;

    const ministriesMarkdown = individualMinistries
      .map(function (ministry, index) {
        const innerTextContainer = document.createElement('div');
        sanityBlockContent(innerTextContainer, ministry.mainText);
        return `<section class="Section-Ministry-Container ${index % 2 !== 0 ? 'Reverse' : ''}">
              <img
                alt="${ministry.imageAlt}"
                title="${ministry.name}"
                src="${ministry.imageUrl}"
              />
              <div class="Text-Container">
                <h2>${ministry.name}</h2>
                <div>
                  ${innerTextContainer.innerHTML}
                </div>
              </div>
            </section>`;
      })
      .reduce((acc, curr) => acc + curr, '');

    ministiresContainer.innerHTML = ministriesMarkdown;
  });
