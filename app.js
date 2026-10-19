/**
 * Welcome Restaurant - Pure Veg Heritage (Estd. 1982)
 * Interactive Application Engine
 */

// Initial Seed Dishes for default experience if empty
const DEFAULT_CART = [
  {
    name: 'Chettinad Ghee Roast Dosa',
    price: 185,
    qty: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsCScLdUgwJXv4K8nB0I2kRJkpJmNgJrnDzTSulbVHxvkjoB6uVCRrHkpYdclJ-ohsezWAKke2PjlPWsg4znpJsske7sy2HXEbEeccWtNIxtrEB_SfZ4_AFe9FgtiIdr8bMRN4F2_oRcsN3CTAG2Fw34FYsMgNicQy_kp6ZAeUN_78rayvdylxzi8NHYQ1KVBijYkk1L4QUSu5lmrKrVc3_UeS2q_XiK8jizxcHxtRQcOUrUxjGbc3',
    tag: 'Chettinad Heritage'
  },
  {
    name: 'South Indian Degree Filter Kaapi',
    price: 55,
    qty: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEGUJksnKYH2PVgZii_ymLPhtMXds7SNIuuocIk-KkLKzo0QYwFuApoELyZThir4W4__JYrqsy6rRImDFhK-2Yo0hNgEbmTqZO3U2uWyk44NCiphiTOpOLpLP0EoGAZxvZFcxlNb28aDSKCxWxYgGPRHniO42thzS-rLU03Qm-FeS_tQDVVeRL639DO42ziaJKwFDdjCKFvThz2CqZzpDZ121gSKXS__XTzffJJ9n1qDV4PiLR2n7f',
    tag: 'Meter Kaapi'
  }
];

let cart = [];

try {
  const savedCart = localStorage.getItem('welcome_restaurant_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  } else {
    cart = [...DEFAULT_CART];
    saveCart();
  }
} catch (e) {
  cart = [...DEFAULT_CART];
}

function saveCart() {
  try {
    localStorage.setItem('welcome_restaurant_cart', JSON.stringify(cart));
  } catch (e) {
    console.error('Could not save cart:', e);
  }
  updateCartUI();
}

// Update Cart Badges & Drawer
function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const counters = document.querySelectorAll('.cart-counter-badge');
  counters.forEach(badge => {
    badge.textContent = totalCount;
    if (totalCount > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });

  const itemsContainer = document.getElementById('cart-drawer-items');
  const subtotalEl = document.getElementById('cart-drawer-subtotal');
  const taxEl = document.getElementById('cart-drawer-tax');
  const deliveryEl = document.getElementById('cart-drawer-delivery');
  const grandTotalEl = document.getElementById('cart-drawer-total');
  const checkoutBtn = document.getElementById('cart-drawer-checkout-btn');
  const emptyState = document.getElementById('cart-drawer-empty');

  if (!itemsContainer) return;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const delivery = subtotal > 400 || subtotal === 0 ? 0 : 35;
  const grandTotal = subtotal === 0 ? 0 : subtotal + tax + delivery;

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (taxEl) taxEl.textContent = `₹${tax}`;
  if (deliveryEl) deliveryEl.textContent = delivery === 0 ? 'FREE' : `₹${delivery}`;
  if (grandTotalEl) grandTotalEl.textContent = `₹${grandTotal}`;

  if (cart.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    if (itemsContainer) itemsContainer.innerHTML = '';
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  }

  itemsContainer.innerHTML = cart.map((item, index) => `
    <div class="flex items-center gap-3.5 p-3.5 rounded-xl bg-surface border border-outline-variant/40 hover:border-primary/40 transition-colors">
      <div class="w-16 h-16 rounded-lg overflow-hidden bg-surface-container shrink-0 border border-outline-variant/20">
        <img src="${item.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwVBzfLpQOEeO2dEfMOGM3cNCMO8jk8EUTHtIqogFSPdMb11CxR-xQMZEKck8hlVS1Z6aJbqko2XOhwcKG1a4sXPPmfCXESXHXENxYr7iHq5ecn65wxoph-aZzMD_3uPAV-a3kU30rid3nUfsC9MRdxYHeP-XvrkKtIuMGpAdn4-h8A-zhqRghFXJCWbTezsJkeB6RcNcufi4IkUjADKKvRG4agop3OSscek3sb6yUycaRv9BhT6Mt'}" 
             alt="${item.name}" 
             class="w-full h-full object-cover"/>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-1.5">
          <div class="pure-veg-symbol" style="width:12px;height:12px;"><div class="pure-veg-dot" style="width:6px;height:6px;"></div></div>
          <h4 class="font-headline-sm text-sm font-semibold text-on-surface truncate">${item.name}</h4>
        </div>
        <div class="text-xs text-on-surface-variant font-medium mt-0.5">₹${item.price} each</div>
        <div class="flex items-center justify-between mt-2">
          <div class="inline-flex items-center bg-surface-container-high rounded-lg border border-outline-variant/50 p-0.5">
            <button onclick="changeCartQty(${index}, -1)" class="w-6 h-6 flex items-center justify-center text-primary font-bold hover:bg-surface rounded active:scale-95 transition-all text-sm">−</button>
            <span class="w-7 text-center font-bold text-xs text-on-surface">${item.qty}</span>
            <button onclick="changeCartQty(${index}, 1)" class="w-6 h-6 flex items-center justify-center text-primary font-bold hover:bg-surface rounded active:scale-95 transition-all text-sm">+</button>
          </div>
          <span class="font-bold text-sm text-primary">₹${item.price * item.qty}</span>
        </div>
      </div>
      <button onclick="removeCartItem(${index})" class="text-on-surface-variant/60 hover:text-red-600 p-1 rounded transition-colors" title="Remove dish">
        <span class="material-symbols-outlined text-lg">delete</span>
      </button>
    </div>
  `).join('');
}

// Cart Actions
function addToCart(name, price, image = '', tag = '') {
  const existing = cart.find(item => item.name.toLowerCase() === name.toLowerCase());
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name,
      price: Number(price),
      qty: 1,
      image: image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwVBzfLpQOEeO2dEfMOGM3cNCMO8jk8EUTHtIqogFSPdMb11CxR-xQMZEKck8hlVS1Z6aJbqko2XOhwcKG1a4sXPPmfCXESXHXENxYr7iHq5ecn65wxoph-aZzMD_3uPAV-a3kU30rid3nUfsC9MRdxYHeP-XvrkKtIuMGpAdn4-h8A-zhqRghFXJCWbTezsJkeB6RcNcufi4IkUjADKKvRG4agop3OSscek3sb6yUycaRv9BhT6Mt',
      tag: tag || 'House Special'
    });
  }
  saveCart();
  showToast('Added to Order', `${name} added to your dining bag (₹${price})`, 'shopping_bag', 'success');

  // Trigger slight pulse animation on nav cart bag
  const bagIcons = document.querySelectorAll('.cart-toggle-btn');
  bagIcons.forEach(btn => {
    btn.classList.add('scale-125');
    setTimeout(() => btn.classList.remove('scale-125'), 200);
  });
}

function changeCartQty(index, delta) {
  if (cart[index]) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      const removed = cart.splice(index, 1);
      showToast('Item Removed', `${removed[0].name} removed from your bag`, 'remove_shopping_cart');
    }
    saveCart();
  }
}

function removeCartItem(index) {
  if (cart[index]) {
    const removed = cart.splice(index, 1);
    saveCart();
    showToast('Item Removed', `${removed[0].name} removed from your bag`, 'delete');
  }
}

// Drawer Open / Close
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.remove('hidden');
    setTimeout(() => {
      drawer.querySelector('.drawer-panel').classList.remove('translate-x-full');
      drawer.querySelector('.drawer-backdrop').classList.remove('opacity-0');
    }, 10);
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.querySelector('.drawer-panel').classList.add('translate-x-full');
    drawer.querySelector('.drawer-backdrop').classList.add('opacity-0');
    setTimeout(() => {
      drawer.classList.add('hidden');
    }, 300);
  }
}

// Mobile Menu Navigation Drawer
function openMobileMenu() {
  const menu = document.getElementById('mobile-nav-drawer');
  if (menu) {
    menu.classList.remove('hidden');
    setTimeout(() => {
      menu.querySelector('.mobile-panel').classList.remove('-translate-x-full');
      menu.querySelector('.mobile-backdrop').classList.remove('opacity-0');
    }, 10);
  }
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-nav-drawer');
  if (menu) {
    menu.querySelector('.mobile-panel').classList.add('-translate-x-full');
    menu.querySelector('.mobile-backdrop').classList.add('opacity-0');
    setTimeout(() => {
      menu.classList.add('hidden');
    }, 300);
  }
}

// Checkout Modal
function openCheckoutModal() {
  closeCartDrawer();
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = Math.round(subtotal * 0.05);
    const delivery = subtotal > 400 || subtotal === 0 ? 0 : 35;
    const grandTotal = subtotal + tax + delivery;

    const summaryEl = document.getElementById('checkout-modal-summary');
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="text-xs text-on-surface-variant flex justify-between"><span>Items (${cart.reduce((s,i)=>s+i.qty,0)})</span><span>₹${subtotal}</span></div>
        <div class="text-xs text-on-surface-variant flex justify-between"><span>GST (5%)</span><span>₹${tax}</span></div>
        <div class="text-xs text-on-surface-variant flex justify-between"><span>Packaging / Delivery</span><span>${delivery === 0 ? 'FREE' : '₹' + delivery}</span></div>
        <div class="text-sm font-bold text-primary flex justify-between border-t border-outline-variant/40 pt-1 mt-1"><span>Total Payable</span><span>₹${grandTotal}</span></div>
      `;
    }

    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.querySelector('.modal-panel').classList.remove('scale-95', 'opacity-0');
    }, 10);
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.querySelector('.modal-panel').classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 200);
  }
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.customerName.value.trim();
  const phone = form.customerPhone.value.trim();
  const orderType = form.orderType.value;
  const address = form.customerAddress ? form.customerAddress.value.trim() : '';

  if (!name || !phone) {
    showToast('Missing Details', 'Please provide your name and phone number', 'warning', 'error');
    return;
  }

  const orderId = 'WR-' + Math.floor(100000 + Math.random() * 900000);
  const totalAmount = document.getElementById('cart-drawer-total')?.textContent || '₹420';

  closeCheckoutModal();

  // Clear cart
  cart = [];
  saveCart();

  // Show Success Confirmation Modal
  const successModal = document.getElementById('order-success-modal');
  if (successModal) {
    document.getElementById('success-order-id').textContent = orderId;
    document.getElementById('success-order-name').textContent = name;
    document.getElementById('success-order-phone').textContent = phone;
    document.getElementById('success-order-type').textContent = orderType === 'delivery' ? 'Express Door Delivery' : 'Table Dine-in Service';
    document.getElementById('success-order-amount').textContent = totalAmount;

    successModal.classList.remove('hidden');
    setTimeout(() => {
      successModal.querySelector('.modal-panel').classList.remove('scale-95', 'opacity-0');
    }, 10);
  }

  showToast('Order Received with Gratitude!', `Order ${orderId} placed successfully. We are preparing your feast!`, 'check_circle', 'success');
}

function closeOrderSuccessModal() {
  const modal = document.getElementById('order-success-modal');
  if (modal) {
    modal.querySelector('.modal-panel').classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 200);
  }
}

// Table Reservation System
function openReservationModal() {
  const modal = document.getElementById('reservation-modal');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.querySelector('.modal-panel').classList.remove('scale-95', 'opacity-0');
    }, 10);
  }
}

function closeReservationModal() {
  const modal = document.getElementById('reservation-modal');
  if (modal) {
    modal.querySelector('.modal-panel').classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 200);
  }
}

function handleReservationSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.guestName?.value || 'Valued Patron';
  const guests = form.guestCount?.value || '2 Guests';
  const date = form.reserveDate?.value || 'Today';
  const session = form.serviceSession?.value || 'Royal Lunch Thali';
  const zone = form.diningZone?.value || 'Traditional Banana Leaf Hall';
  const phone = form.guestPhone?.value || '+91 98400 12345';

  const bookingRef = 'WR-RES-' + Math.floor(1000 + Math.random() * 9000);

  closeReservationModal();

  // Show Booking Success Modal
  const bookingModal = document.getElementById('booking-success-modal');
  if (bookingModal) {
    document.getElementById('booking-ref-code').textContent = bookingRef;
    document.getElementById('booking-guest-name').textContent = name;
    document.getElementById('booking-date-session').textContent = `${date} • ${session}`;
    document.getElementById('booking-zone').textContent = zone;
    document.getElementById('booking-guests-count').textContent = guests;

    bookingModal.classList.remove('hidden');
    setTimeout(() => {
      bookingModal.querySelector('.modal-panel').classList.remove('scale-95', 'opacity-0');
    }, 10);
  }

  showToast('Table Reserved!', `Booking Reference ${bookingRef} confirmed for ${name}.`, 'event_seat', 'success');
}

function closeBookingSuccessModal() {
  const modal = document.getElementById('booking-success-modal');
  if (modal) {
    modal.querySelector('.modal-panel').classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 200);
  }
}

// Inquiries & Newsletter
function handleInquirySubmit(e) {
  e.preventDefault();
  showToast('Message Transmitted', 'Our hospitality team will respond within 2 hours. Vanakkam!', 'mark_email_read', 'success');
  e.target.reset();
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  showToast('Subscribed to Temple Dispatch', 'Welcome to our heritage updates & seasonal recipes!', 'mark_email_read', 'success');
  e.target.reset();
}

// Toast System
function showToast(title, message, icon = 'info', type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item ${type}`;
  toast.innerHTML = `
    <div class="w-8 h-8 rounded-full ${type === 'success' ? 'bg-secondary/15 text-secondary' : 'bg-primary/15 text-primary'} flex items-center justify-center shrink-0">
      <span class="material-symbols-outlined text-lg">${icon}</span>
    </div>
    <div class="flex-1">
      <div class="font-bold text-sm text-on-surface leading-tight">${title}</div>
      <div class="text-xs text-on-surface-variant mt-0.5 leading-snug">${message}</div>
    </div>
    <button onclick="this.parentElement.remove()" class="text-on-surface-variant/40 hover:text-on-surface p-1">
      <span class="material-symbols-outlined text-sm">close</span>
    </button>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

// Menu Filtering Engine (menus.html)
let activeDietaryFilter = null;
function filterMenuCategory(category, buttonEl) {
  const pills = document.querySelectorAll('.category-pill');
  pills.forEach(btn => {
    btn.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
    btn.classList.add('bg-surface', 'border', 'border-outline-variant', 'text-on-surface');
  });

  if (buttonEl) {
    buttonEl.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
    buttonEl.classList.remove('bg-surface', 'border', 'border-outline-variant', 'text-on-surface');
  }

  const sections = document.querySelectorAll('.menu-category-block');
  const countEl = document.getElementById('active-dish-counter');
  let visibleCount = 0;

  if (category === 'all') {
    sections.forEach(sec => sec.classList.remove('hidden'));
    const cards = document.querySelectorAll('article');
    cards.forEach(card => {
      if (card.style.display !== 'none') visibleCount++;
    });
  } else {
    sections.forEach(sec => {
      if (sec.id === `section-${category}`) {
        sec.classList.remove('hidden');
        const cards = sec.querySelectorAll('article');
        cards.forEach(card => {
          if (card.style.display !== 'none') visibleCount++;
        });
      } else {
        sec.classList.add('hidden');
      }
    });

    // Smooth scroll to top of menu
    const menuContainer = document.getElementById('menu-showcase-container');
    if (menuContainer) {
      menuContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (countEl) countEl.textContent = visibleCount;
}

function toggleDietaryFilter(type) {
  const jainBtn = document.getElementById('dietary-filter-jain');
  const veganBtn = document.getElementById('dietary-filter-vegan');
  const articles = document.querySelectorAll('article[data-tags]');
  const countEl = document.getElementById('active-dish-counter');

  if (activeDietaryFilter === type) {
    activeDietaryFilter = null;
    if (jainBtn) jainBtn.classList.remove('bg-secondary', 'text-on-secondary');
    if (veganBtn) veganBtn.classList.remove('bg-secondary', 'text-on-secondary');
    articles.forEach(art => art.style.display = '');
    if (countEl) countEl.textContent = document.querySelectorAll('article').length;
    showToast('Filter Cleared', 'Showing all vegetarian dishes', 'filter_alt_off');
    return;
  }

  activeDietaryFilter = type;
  if (type === 'jain') {
    if (jainBtn) jainBtn.classList.add('bg-secondary', 'text-on-secondary');
    if (veganBtn) veganBtn.classList.remove('bg-secondary', 'text-on-secondary');
    showToast('Jain Sattvic Filter', 'Showing dishes prepared without onion or garlic', 'spa');
  } else {
    if (veganBtn) veganBtn.classList.add('bg-secondary', 'text-on-secondary');
    if (jainBtn) jainBtn.classList.remove('bg-secondary', 'text-on-secondary');
    showToast('Pure Vegan Filter', 'Showing dishes free of ghee & dairy derivatives', 'eco');
  }

  let count = 0;
  articles.forEach(art => {
    const tags = art.getAttribute('data-tags') || '';
    if (tags.includes(type)) {
      art.style.display = '';
      count++;
    } else {
      art.style.display = 'none';
    }
  });

  if (countEl) countEl.textContent = count;
}

// Heritage Story Tabs (about.html)
const HERITAGE_TABS = {
  ghee: {
    title: 'Wood-Churned A2 Bilona Cow Ghee',
    desc: 'Our cultured butter is churned by hand in seasoned earthen churners, then gently clarified over slow tamarind-wood coals. Golden, nutty, and luminous, it elevates each dosa roast without heaviness.',
    badge: 'Pure A2 Native Breed Milk',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2yL0EhtbZUkgZRDIUC8GXVoMUypJgrxHwfrBXtvI6zeE4zdAlb90YOWwAnKo5joMFnrLGFtkQWQ-FkuxzELc5sEvEvY5seGdadVA7465GX3GY76SHUsyKePWvFz8A-jRyjcR68DlVsOy4rxSP5I-GcJ-L5mHK6nhlQkEIujTCeq9ZGIdGRULiH81y4ugvjj4VR6XD-HJcliTuYv3gOS-JaRM9ocLqkSfePu6lt7RGDDkvDdFGICpM'
  },
  grinding: {
    title: 'Cool Granite Stone Wet Grinding',
    desc: 'We refuse modern high-speed steel blenders that scorch natural fermentation bacteria. Heavy black river stone roller grinders turn unpolished urad dal and parboiled rice into velvet batter under cool well water.',
    badge: '14-Hour Natural Ambient Aeration',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcyaOabZbWPGNyjdVF9BXJcmtM_B_PKYtEDk8AtxXFYDXxaUGGvAGbclElvwkITAIyc_xql1iYvvtgzDNcSGSV4XxvvPW1BFGgmSmwYz2kvUHal2un69cwXanIWPaXW6EixMaOHdZl1v0cb9G3_iG7d1W7uEgiE821fp_S-9XQPkIfpEj2taPAZlIsHaR8UN8Zv85K1WaS--j-DjfN5h73KKICZMBs0IUEZwOaP2BnCZrC4twENEuf'
  },
  banana: {
    title: 'The Sacred Banana Leaf Ceremony',
    desc: 'Dining on freshly harvested, washed plantain leaves is an ancient Vedic science. The warm food releases polyphenols (epigallocatechin gallate) from the leaf surface, imparting a delicate herbal aroma while aiding digestion.',
    badge: '100% Biodegradable & Natural',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwVBzfLpQOEeO2dEfMOGM3cNCMO8jk8EUTHtIqogFSPdMb11CxR-xQMZEKck8hlVS1Z6aJbqko2XOhwcKG1a4sXPPmfCXESXHXENxYr7iHq5ecn65wxoph-aZzMD_3uPAV-a3kU30rid3nUfsC9MRdxYHeP-XvrkKtIuMGpAdn4-h8A-zhqRghFXJCWbTezsJkeB6RcNcufi4IkUjADKKvRG4agop3OSscek3sb6yUycaRv9BhT6Mt'
  },
  kaapi: {
    title: 'The Brass Dabarah Filter Kaapi Ritual',
    desc: 'Plantation A peaberry beans roasted to dark chocolate perfection with 15% slow-roasted chicory. Brewed drop-by-drop through stainless gravity filters and aerated with a rhythmic arm sweep in heavy brass dabarahs.',
    badge: 'Chicory & Peaberry Master Blend',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCpkLEtAMUlSGaMM-QzdngT6N8vNx7mK8PQNhkTYbb9i_JU9OJbVu7xo9esOnm8YjUMlITdZJsIlVwjclaNhHn9oP2ME6uUbmhVMo0AnpXghtm8nPRh8ZYd-mo9Mo-fLwAjzC6bZViMSd-5VOtGYY4YJpD3alnSEJuhNdd0QABobH_dLBcNtJXH2Y7IKerf9X_2sqBFtYljUiT_rHSPNGNj-D8tBdFvLYlPyHaREqSL6ET9T2rmVNF'
  }
};

function switchHeritageTab(tabKey, btnEl) {
  const tabData = HERITAGE_TABS[tabKey];
  if (!tabData) return;

  const titleEl = document.getElementById('heritage-tab-title');
  const descEl = document.getElementById('heritage-tab-desc');
  const badgeEl = document.getElementById('heritage-tab-badge');
  const imgEl = document.getElementById('heritage-tab-image');

  if (titleEl) titleEl.textContent = tabData.title;
  if (descEl) descEl.textContent = tabData.desc;
  if (badgeEl) badgeEl.textContent = tabData.badge;
  if (imgEl) {
    imgEl.style.opacity = '0';
    setTimeout(() => {
      imgEl.src = tabData.image;
      imgEl.style.opacity = '1';
    }, 200);
  }

  const buttons = document.querySelectorAll('.heritage-tab-btn');
  buttons.forEach(b => {
    b.classList.remove('border-primary', 'text-primary', 'bg-primary/5', 'font-semibold');
    b.classList.add('border-transparent', 'text-on-surface-variant');
  });

  if (btnEl) {
    btnEl.classList.add('border-primary', 'text-primary', 'bg-primary/5', 'font-semibold');
    btnEl.classList.remove('border-transparent', 'text-on-surface-variant');
  }
}

// Run upon DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();

  // Wire up any search inputs
  const searchInput = document.getElementById('menu-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const articles = document.querySelectorAll('article');
      let visible = 0;
      articles.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (!q || text.includes(q)) {
          card.style.display = '';
          visible++;
        } else {
          card.style.display = 'none';
        }
      });
      const countEl = document.getElementById('active-dish-counter');
      if (countEl) countEl.textContent = visible;
    });
  }
});
