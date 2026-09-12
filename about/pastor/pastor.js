const PROJECT_ID = 'r94v9owx';
const DATASET = 'production';
const PAGE_NAME = 'pastor';
const QUERY = encodeURIComponent(`*[_type == "${PAGE_NAME}"]{
  _id,
  name,
  bannerText,
  biography,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt
}`);

const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const nameContainer = document.querySelector('#nameContainer');
const bannerTextContainer = document.querySelector('#bannerTextContainer');
const biographyContainer = document.querySelector('#biographyContainer');
const image = document.querySelector('#image');

fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result.find((obj) => obj?._id === PAGE_NAME);
    const { name, bannerText, biography, imageUrl, imageAlt } = page;

    nameContainer.innerText = name;
    sanityBlockContent(bannerTextContainer, bannerText);
    sanityBlockContent(biographyContainer, biography);
    image.src = imageUrl;
    image.alt = imageAlt;
  });
