// Dummy data for magazines
const magazinesData = [
    { name: "Magazine Car and Driver", link: "https://store.caranddriver.com/car-and-driver-magazine-sem.html?cds_tracking_code=paidsearch&utm_source=bing&utm_medium=cpc&utm_campaign=cdb_print_offer_sept23&utm_id=bi_cmp-361487282_adg-1180876372600728_ad-73804976105950_kwd-73805077214486:loc-144_dev-c_ext-_prd-_sig-cf994987b38b117d5ae72cfe11c45f49&msclkid=cf994987b38b117d5ae72cfe11c45f49", src:"https://store.caranddriver.com/media/catalog/product/c/a/car-and-driver-magazine-107308.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=635&width=635&canvas=635:635&format=jpeg" },
    { name: "Magazine 2", link: "https://example.com/magazine2", src: "https://jang.com.pk/assets/uploads/magazine/2018-09-22/b_554026_115322_updates.jpg" },
    { name: "The New Yorker", link: "https://www.magazineline.com/the-new-yorker-magazine?AffiliateID=LVU-50D30&sscid=c1k7_gidew&", src: "https://www.magazineline.com/~/media/Shared/Images/Products/T/KM_TheNewYorker_231210.ashx?h=295&iar=1&w=225" },
    { name: "Aljazerra", link: "https://www.aljazeera.com/news/2023/12/12/894", src: "https://www.aljazeera.com/wp-content/uploads/2023/12/1000x562-PAKISTAN-DERA-KHAN-1702370130.jpg?resize=770%2C513&quality=80" },
    { name: "Read Palestine", link: "https://lithub.com/read-palestine-week-begins-tomorrow-and-you-can-read-these-titles-for-free/", src: "https://s26162.pcdn.co/wp-content/uploads/2023/11/Read-Palestine-Week.png" },
    { name: "Time", link: "https://www.time.com/6344541/gaza-fighting-rages-israel-renewed-us-support/", src: "https://api.time.com/wp-content/uploads/2023/12/AP23344310511701.jpg?quality=85&w=1920" }
    // Add more magazines as needed
];

// Function to generate the HTML for each magazine
function generateMagazineHTML(magazine) {
    return `<div class="magazine">
                <a href="${magazine.link}" target="_blank">
                    <h3>${magazine.name}</h3>
                    <img src=${magazine.src} alt="${magazine.name} width={200} class = "magazine-img">
                </a>
            </div>`;
}

// Function to render magazines in the container
function renderMagazines() {
    const magazinesContainer = document.getElementById("magazinesContainer");

    // Generate HTML for each magazine and append to the container
    magazinesData.forEach(magazine => {
        const magazineHTML = generateMagazineHTML(magazine);
        magazinesContainer.innerHTML += magazineHTML;
    });
}

// Call the renderMagazines function to populate the container
renderMagazines();
