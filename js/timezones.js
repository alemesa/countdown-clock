console.log('This is the timezones script 🗺️');

function getLocalTimeZone() {
  let now = new Date();
  let localUTC = -(now.getTimezoneOffset() / 60);
  return localUTC;
}

function displayTimeZones(tz) {
  const utc = parseInt(tz.dataset.utc);
  const cityName = tz.dataset.city;
  const countryCode = tz.dataset.country;
  const img = `<img src="../../img/flags/${countryCode}.svg" />`;
  const difference = (utc - getLocalTimeZone()) * 60 * 60 * 1000;

  setInterval(() => {
    const now = Date.now();
    const timezoneSeconds = now + difference;
    const timezone = new Date(timezoneSeconds);
    const seconds =
      timezone.getSeconds() < 10
        ? '0' + timezone.getSeconds()
        : timezone.getSeconds();
    const minutes =
      timezone.getMinutes() < 10
        ? '0' + timezone.getMinutes()
        : timezone.getMinutes();

    const hour =
      timezone.getHours() > 12 ? timezone.getHours() % 12 : timezone.getHours();
    const ampm = timezone.getHours() > 11 ? 'PM' : 'AM';
    const display = `${img} ${cityName} ${hour == 0
      ? 12
      : hour}:${minutes}:${seconds} ${ampm}`;
    tz.innerHTML = display;
  }, 1000);
}

document.addEventListener(
  'DOMContentLoaded',
  timezones.forEach(tz => displayTimeZones(tz))
);
