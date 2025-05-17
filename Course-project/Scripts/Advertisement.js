function loadAdvertisementData() {
    const meta = document.querySelector('meta[name="xml-file"]');
    const xmlFile = meta ? meta.content : 'default.xml';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', xmlFile, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");

            const ad = xmlDoc.getElementsByTagName('advertisement')[0];

            document.getElementById('ad-title').textContent = ad.getElementsByTagName('title')[0]?.textContent || '';
            document.getElementById('ad-price').textContent = (ad.getElementsByTagName('price')[0]?.textContent || '') + " руб.";
            document.getElementById('ad-address').textContent = ad.getElementsByTagName('address')[0]?.textContent || '';
            document.getElementById('ad-area').textContent = (ad.getElementsByTagName('area')[0]?.textContent || '') + " м²";

            const roomsElement = document.getElementById('ad-rooms');
            const roomsTag = ad.getElementsByTagName('rooms')[0];
            if (roomsElement && roomsTag) {
                roomsElement.textContent = roomsTag.textContent;
            }

            document.getElementById('ad-description').textContent = ad.getElementsByTagName('description')[0]?.textContent || '';

            const landElement = document.getElementById('ad-land');
            const landTag = ad.getElementsByTagName('land')[0];
            if (landElement && landTag) {
                landElement.textContent = landTag.textContent + " соток";
            }

            const contact = ad.getElementsByTagName('contact')[0];
            if (contact) {
                document.getElementById('contact-name').textContent = contact.getElementsByTagName('name')[0]?.textContent || '';
                document.getElementById('contact-phone').textContent = contact.getElementsByTagName('phone')[0]?.textContent || '';
                document.getElementById('contact-email').textContent = contact.getElementsByTagName('email')[0]?.textContent || '';
            }
        }
    };
    xhr.send();
}

window.onload = loadAdvertisementData;