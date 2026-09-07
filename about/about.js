const PROJECT_ID = 'r94v9owx';
const DATASET = 'production';
const PAGE_NAME = 'about';
const QUERY = encodeURIComponent(`*[_type in ["${PAGE_NAME}", "leader"]]{
  _type == "${PAGE_NAME}" => {
    _id,
    _type,
    mainHeadline,
    mainText,
    leadersHeadline,
    leaders
  },
  _type == "leader" => {
    _type,
    _id,
    name,
    role,
    email,
    biography,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }
}`);

const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const mainHeadlineContainer = document.querySelector('#mainHeadlineContainer');
const mainTextContainer = document.querySelector('#mainTextContainer');
const leadersHeadlineContainer = document.querySelector(
  '#leadersHeadlineContainer',
);
const leadersContainer = document.querySelector('#leadersContainer');

fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result.find((obj) => obj?._id === PAGE_NAME);
    const { mainHeadline, mainText, leadersHeadline, leaders } = page;

    mainHeadlineContainer.innerText = mainHeadline;
    sanityBlockContent(mainTextContainer, mainText);

    leadersHeadlineContainer.innerText = leadersHeadline;

    const leaderData = leaders?.map((leader) =>
      result.find((obj) => obj?._id === leader?._ref),
    );

    const leaderMarkdowns = leaderData.map((leader) => {
      return `<div class="Leader">
                <img alt="${leader.imageAlt}" src="${leader.imageUrl}" />
                <div class="Name">
                  ${!!leader.biography ? `<a href="./pastor" data-discover="true">${leader.name}</a>` : leader.name}
                </div>
                <div class="Position">${leader.role}</div>
                ${
                  leader.email
                    ? `<div class="Email">
                  <a href="mailto:${leader.email}" title="Email ${leader.name}"
                    >${leader.email}</a
                  >
                </div>`
                    : ''
                }
              </div>`;
    });

    leadersContainer.innerHTML = leaderMarkdowns.reduce(
      (acc, markdown) => acc + markdown,
      '',
    );
  });
