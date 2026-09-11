setupAccordions();

getContent();

function getContent() {
  const PROJECT_ID = 'r94v9owx';
  const DATASET = 'production';
  const PAGE_NAME = 'visit';
  const QUERY = encodeURIComponent(`*[_type == "${PAGE_NAME}"]{
  _id,
  mainHeadline,
  scheduleHeadline,
  scheduleText,
  addressHeadline,
  addressText,
  contactHeadline,
  contactText,
  faqHeadline,
  faqArray[] {
    question,
    answer
  }
}`);

  const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

  const mainHeadlineContainer = document.querySelector(
    '#mainHeadlineContainer',
  );
  const scheduleHeadlineContainer = document.querySelector(
    '#scheduleHeadlineContainer',
  );
  const scheduleTextContainer = document.querySelector(
    '#scheduleTextContainer',
  );
  const addressHeadlineContainer = document.querySelector(
    '#addressHeadlineContainer',
  );
  const addressTextContainer = document.querySelector('#addressTextContainer');
  const contactHeadlineContainer = document.querySelector(
    '#contactHeadlineContainer',
  );
  const contactTextContainer = document.querySelector('#contactTextContainer');
  const faqHeadlineContainer = document.querySelector('#faqHeadlineContainer');
  const faqContainer = document.querySelector('#faqContainer');

  fetch(URL)
    .then((res) => res.json())
    .then(({ result }) => {
      const page = result.find((obj) => obj?._id === PAGE_NAME);
      const {
        mainHeadline,
        scheduleHeadline,
        scheduleText,
        addressHeadline,
        addressText,
        contactHeadline,
        contactText,
        faqHeadline,
        faqArray,
      } = page;

      mainHeadlineContainer.innerText = mainHeadline;
      scheduleHeadlineContainer.innerText = scheduleHeadline;
      sanityBlockContent(scheduleTextContainer, scheduleText);
      addressHeadlineContainer.innerText = addressHeadline;
      sanityBlockContent(addressTextContainer, addressText);
      contactHeadlineContainer.innerText = contactHeadline;
      sanityBlockContent(contactTextContainer, contactText);
      faqHeadlineContainer.innerText = faqHeadline;

      faqContainer.innerHTML = faqArray
        .map(function ({ question, answer }) {
          const accordionContent = document.createElement('div');
          sanityBlockContent(accordionContent, answer);

          return `
        <button class="accordion">${question}</button>
        <div class="panel">${accordionContent.innerHTML}</div>`;
        })
        .reduce((acc, cur) => (acc += cur), '');

      setupAccordions();
    });
}

function setupAccordions() {
  var acc = document.getElementsByClassName('accordion');

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function () {
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        closeAccordion(this);
      } else {
        document.querySelectorAll('.accordion.active').forEach(closeAccordion);
        this.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  }

  function closeAccordion(accordion) {
    accordion.classList.remove('active');
    var panel = accordion.nextElementSibling;
    panel.style.maxHeight = null;
  }
}
