// Gabungkan script ini ke dalam <script> di new one.html, hapus tag <script> pembuka/penutup ganda

function openNav() {
    document.getElementById("mySidebar").style.width = "180px";
}
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}
// Check login status
let user = localStorage.getItem("user");
if (!user) {
    window.location.href = "login.html";
}
function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("password");
    window.location.href = "login.html";
}
function storeData() {
    localStorage.setItem("uss.html", "new one.html");
}
// Smooth scroll to contact section when Contact button is clicked
document.getElementById('contactBtn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// --- BUY POPUP LOGIC ---
let currentProduct = { name: '', price: 0 };
function openBuyPopup(productName, price) {
    currentProduct.name = productName;
    currentProduct.price = price;
    document.getElementById('popupProductName').innerText = productName;
    document.getElementById('popupPrice').innerText = price.toLocaleString();
    document.getElementById('popupQuantity').value = 1;
    document.getElementById('popupNote').value = '';
    document.getElementById('popupTotal').innerText = price.toLocaleString();
    document.getElementById('buyPopupOverlay').classList.add('active');
}
function closeBuyPopup() {
    document.getElementById('buyPopupOverlay').classList.remove('active');
}
document.getElementById('popupQuantity').addEventListener('input', function() {
    let qty = parseInt(this.value) || 1;
    let total = qty * currentProduct.price;
    document.getElementById('popupTotal').innerText = total.toLocaleString();
});

// Custom notification logic with centang and detail
function showNotifWithCheckmark(detailMessage) {
    const notifPopup = document.getElementById('notifPopup');
    const notifBox = document.getElementById('notifBox');
    // Step 1: Show checkmark
    notifBox.innerHTML = `
        <div class="checkmark-popup">
            <svg class="checkmark" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="25" fill="none" stroke="#28a745" stroke-width="3"/>
                <path fill="none" stroke="#28a745" stroke-width="4" d="M14 27l8 8 16-16"/>
            </svg>
            <div style="font-size:1.2em; color:#28a745; margin-bottom:8px;">Pembelian Berhasil!</div>
        </div>
    `;
    notifPopup.style.display = 'flex';

    notifPopup.onclick = null;

    setTimeout(() => {
        notifBox.innerHTML = detailMessage + `<br><button id="notifCloseBtn" style="margin-top:18px;padding:8px 24px;border-radius:6px;border:none;background:#28a745;color:#fff;font-weight:bold;cursor:pointer;">Tutup</button>`;
        notifPopup.onclick = function(e) {
            if (e.target === notifPopup) notifPopup.style.display = 'none';
        };
        document.getElementById('notifCloseBtn').onclick = function() {
            notifPopup.style.display = 'none';
        };
    }, 1200);
}

document.getElementById('buyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let qty = parseInt(document.getElementById('popupQuantity').value) || 1;
    let note = document.getElementById('popupNote').value;
    let total = qty * currentProduct.price;
    closeBuyPopup();
    showNotifWithCheckmark(
        `<b>Pesanan Anda:</b><br>
        Produk: ${currentProduct.name}<br>
        Jumlah: ${qty}<br>
        Total Harga: Rp ${total.toLocaleString()}<br>
        Catatan: ${note ? note : '-'}<br><br>
        <span style="color:#28a745;">Terima kasih sudah berbelanja!</span>`
    );
});

// Contact form logic
const contactForm = document.getElementById('contactForm');
const contactName = document.getElementById('contactName');
const contactEmail = document.getElementById('contactEmail');
const contactMsg = document.getElementById('contactMsg');
const saveContact = document.getElementById('saveContact');

// Load saved data if exists
window.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('savedContact')) {
        const saved = JSON.parse(localStorage.getItem('savedContact'));
        contactName.value = saved.name || '';
        contactEmail.value = saved.email || '';
        saveContact.checked = true;
    }
});

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for contacting us!');
    if(saveContact.checked) {
        localStorage.setItem('savedContact', JSON.stringify({
            name: contactName.value,
            email: contactEmail.value
        }));
    } else {
        localStorage.removeItem('savedContact');
        contactName.value = '';
        contactEmail.value = '';
    }
    contactMsg.value = '';
});