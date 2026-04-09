const products = [
    { id: 1, name: "Apex Pro 4-Person Tent", price: 899, category: "Camping", img: "images/tent.jpg", desc: "Military-grade ripstop fabric with geodesic pole structure.", specs: "Weight: 3.2kg | Waterproof: 5000mm | Capacity: 4 Adults" },
    { id: 3, name: "Summit Thermal Shield", price: 280, category: "Camping", img: "images/heatshield.jpg", desc: "NASA-inspired insulation for sub-zero survival.", specs: "Temp Limit: -15°C | Weight: 1.1kg | Material: Recycled Down" },
    { id: 4, name: "Ti-Lite Survival Stove", price: 120, category: "Camping", img: "images/stove.jpg", desc: "The world's lightest titanium multi-fuel stove.", specs: "Weight: 45g | Boil Time: 3.2min | Fuel: Gas/Liquid" },
    { id: 7, name: "Lumina Basecamp Lantern", price: 150, category: "Camping", img: "images/lantern.jpg", desc: "1000-lumen rechargeable LED lantern with power bank feature.", specs: "Battery: 10,000mAh | Runtime: 48h | IPX6 Water Resistant" },
    { id: 8, name: "Aero-Mat Sleeping Pad", price: 210, category: "Camping", img: "images/pad.jpg", desc: "Self-inflating memory foam core for ultimate off-grid comfort.", specs: "Thickness: 7cm | R-Value: 4.5 | Pack Size: 20x15cm" },
    { id: 12, name: "Titanium Cookset", price: 195, category: "Camping", img: "images/cookset.jpg", desc: "Ultralight nesting pot and pan set for backcountry gourmets.", specs: "Weight: 220g | Material: Titanium | Includes: 1L Pot, Pan" }
];

let cart = JSON.parse(localStorage.getItem('apex_cart')) || [];
let currentSearchQuery = "";
let currentSort = "default";

function showView(view) {
    const main = document.getElementById('main-content');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    

    const navItems = ['home', 'story', 'blog'];
    navItems.forEach(item => {
        const el = document.getElementById('nav-' + item);
        if (el) {
            if (item === view) {
                el.classList.remove('text-gray-400', 'hover:text-emerald-600');
                el.classList.add('text-gray-900');
            } else {
                el.classList.remove('text-gray-900');
                el.classList.add('text-gray-400', 'hover:text-emerald-600');
            }
        }
    });
    
    if (view === 'home') renderHome();
    else if (view === 'story') renderStory();
    else if (view === 'blog') renderBlog();
    else if (view === 'checkout') renderCheckout();
    
    lucide.createIcons();
    updateCartUI();
}

function getSortedProducts() {
    let sorted = [...products];
    if (currentSearchQuery) {
        sorted = sorted.filter(p => p.name.toLowerCase().includes(currentSearchQuery));
    }
    if (currentSort === 'price-asc') {
        sorted.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
        sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
}

function handleSort(val) {
    currentSort = val;
    const grid = document.getElementById('product-grid');
    if (grid) {
        grid.innerHTML = renderProductList(getSortedProducts());
        lucide.createIcons();
    }
}

function handleSearch(val) {
    currentSearchQuery = val.toLowerCase();
    const grid = document.getElementById('product-grid');
    if (grid) {
        grid.innerHTML = renderProductList(getSortedProducts());
        lucide.createIcons();
    }
}

function renderHome() {
    document.getElementById('main-content').innerHTML = `
        <section class="relative bg-gray-950 h-[700px] flex items-center overflow-hidden animate-view">
            <div class="absolute inset-0 bg-[url('[https://images.unsplash.com/photo-1504280390467-336c1e345f08?auto=format&fit=crop&w=1920&q=80](https://images.unsplash.com/photo-1504280390467-336c1e345f08?auto=format&fit=crop&w=1920&q=80)')] bg-cover bg-center opacity-40 scale-110"></div>
            <div class="max-w-7xl mx-auto px-4 relative z-10 text-white">
                <div class="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-5 py-2 rounded-full mb-8 backdrop-blur-md">
                    <span class="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">2026 Collection Live</span>
                </div>
                <h1 class="text-7xl md:text-[9rem] font-black mb-10 leading-[0.85] tracking-tighter uppercase">The<br><span class="text-emerald-500">Apex</span> Way.</h1>
                <p class="text-xl mb-12 max-w-xl text-gray-400 font-medium uppercase tracking-widest leading-relaxed">Defining the next era of wilderness survival and exploration.</p>
                <div class="flex gap-6">
                    <button onclick="document.getElementById('gear-section').scrollIntoView({behavior: 'smooth'})" class="bg-emerald-500 text-gray-950 px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-emerald-500/40 hover:scale-105 transition">Shop Camping Gear</button>
                    <button onclick="showView('story')" class="bg-white/10 backdrop-blur-md border border-white/20 text-white px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-white/20 transition">Our Ethos</button>
                </div>
            </div>
        </section>
        <div id="gear-section" class="max-w-7xl mx-auto px-4 py-32">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                <div>
                    <h2 class="text-5xl font-black uppercase tracking-tighter mb-4">Basecamp Essentials</h2>
                    <p class="text-gray-400 font-bold uppercase tracking-widest text-xs">Battle-tested camping gear for global terrains</p>
                </div>
                
                <div class="flex items-center gap-3">
                    <i data-lucide="arrow-up-down" class="w-4 h-4 text-gray-400"></i>
                    <select onchange="handleSort(this.value)" class="bg-white border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-widest rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
                        <option value="default" ${currentSort === 'default' ? 'selected' : ''}>Featured</option>
                        <option value="price-asc" ${currentSort === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                        <option value="price-desc" ${currentSort === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                    </select>
                </div>
            </div>
        <div id="product-grid" class="grid grid-cols-1 md:grid-cols-3 gap-12">
        ${renderProductList(getSortedProducts())}
        </div>
        </div>
    `;
}

function renderStory() {
    document.getElementById('main-content').innerHTML = `
        <section class="pt-48 pb-32 px-4 bg-white animate-view">
            <div class="max-w-4xl mx-auto">
                <span class="text-emerald-600 font-black text-xs uppercase tracking-[0.4em] mb-6 block">Legacy of Adventure</span>
                <h2 class="text-7xl font-black uppercase tracking-tighter mb-12 leading-none">Gear That Respects<br>the Planet.</h2>
                <div class="space-y-12 text-gray-500 text-lg font-medium leading-loose">
                    <p>Founded in 2026, Apex Adventure was born from a singular mission: to provide the world's most durable equipment without leaving a footprint. Our materials are sourced from ocean plastics and aerospace recycling centers, ensuring that your tools for exploring the wild aren't the cause of its destruction.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div class="bg-gray-50 p-10 rounded-[3rem]">
                            <div class="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6"><i data-lucide="leaf"></i></div>
                            <h3 class="text-gray-900 font-black mb-4 uppercase text-sm tracking-widest">Sustainability First</h3>
                            <p class="text-sm">We've eliminated 95% of virgin plastics from our supply chain.</p>
                        </div>
                        <div class="bg-gray-50 p-10 rounded-[3rem]">
                            <div class="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6"><i data-lucide="shield"></i></div>
                            <h3 class="text-gray-900 font-black mb-4 uppercase text-sm tracking-widest">Lifetime Guarantee</h3>
                            <p class="text-sm">Every product we make is designed to last at least 25 years of field use.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderBlog() {
    document.getElementById('main-content').innerHTML = `
        <section class="pt-40 pb-32 px-4 bg-[#fafafa] animate-view min-h-screen">
            <div class="max-w-7xl mx-auto">
                <div class="mb-16">
                    <span class="text-emerald-600 font-black text-xs uppercase tracking-[0.4em] mb-4 block">Field Notes</span>
                    <h2 class="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Survival & Tactics.</h2>
                    <p class="text-gray-500 font-medium max-w-2xl text-lg">Expert guides, gear maintenance tips, and stories from the absolute edge of the map. Optimizing our SEO reach.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group cursor-pointer">
                        <div class="h-64 bg-gray-200 overflow-hidden relative">
                            <img src="[https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80)" alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                        </div>
                        <div class="p-8">
                            <span class="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full mb-4 inline-block">Gear Guide</span>
                            <h3 class="font-bold text-2xl mb-4 tracking-tight text-gray-800">How to Choose a Sub-Zero Sleeping Bag</h3>
                            <p class="text-gray-500 text-sm leading-relaxed mb-6">Understanding R-values, down fill power, and synthetic alternatives for extreme cold weather survival.</p>
                            <span class="text-xs font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2 group-hover:gap-4 transition-all">Read Protocol <i data-lucide="arrow-right" class="w-4 h-4"></i></span>
                        </div>
                    </div>
                    <div class="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group cursor-pointer">
                        <div class="h-64 bg-gray-200 overflow-hidden relative">
                            <img src="[https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80)" alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                        </div>
                        <div class="p-8">
                            <span class="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full mb-4 inline-block">Locations</span>
                            <h3 class="font-bold text-2xl mb-4 tracking-tight text-gray-800">Top 10 Wild Camping Spots</h3>
                            <p class="text-gray-500 text-sm leading-relaxed mb-6">Discover untouched terrains and off-grid locations that challenge even the most experienced mountaineers.</p>
                            <span class="text-xs font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2 group-hover:gap-4 transition-all">Read Protocol <i data-lucide="arrow-right" class="w-4 h-4"></i></span>
                        </div>
                    </div>
                    <div class="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group cursor-pointer">
                        <div class="h-64 bg-gray-200 overflow-hidden relative">
                            <img src="[https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80)" alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                        </div>
                        <div class="p-8">
                            <span class="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full mb-4 inline-block">Maintenance</span>
                            <h3 class="font-bold text-2xl mb-4 tracking-tight text-gray-800">Tent Care & Waterproofing 101</h3>
                            <p class="text-gray-500 text-sm leading-relaxed mb-6">Extend the 25-year lifespan of your Apex geodesic tent with proper post-expedition cleaning and storage.</p>
                            <span class="text-xs font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2 group-hover:gap-4 transition-all">Read Protocol <i data-lucide="arrow-right" class="w-4 h-4"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    lucide.createIcons();
}

function renderProductList(list) {
    return list.map(p => `
        <div class="product-card group bg-white rounded-[2.5rem] border border-gray-100 p-8 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700">
            <div onclick="openProductDetail(${p.id})" class="cursor-pointer aspect-square bg-[#f8f8f8] rounded-[2rem] mb-8 flex items-center justify-center shadow-inner overflow-hidden relative">
                <img src="${p.img}" alt="" class="product-img w-full h-full object-contain p-6 transition-transform duration-700" onerror="this.src='[https://via.placeholder.com/400?text=No+Image](https://via.placeholder.com/400?text=No+Image)'">
                <div class="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-500">
                    <span class="bg-white text-gray-900 text-[10px] font-black px-6 py-3 rounded-full shadow-xl uppercase tracking-widest">View Details</span>
                </div>
            </div>
            <div class="flex justify-between items-start mb-3">
                <span class="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full">${p.category}</span>
                <span class="font-black text-2xl tracking-tighter">RM ${p.price}</span>
            </div>
            <h3 class="font-bold text-2xl mb-4 tracking-tight text-gray-800">${p.name}</h3>
            <button onclick="addToCart(${p.id})" class="w-full bg-gray-900 text-white py-5 rounded-[1.2rem] font-black uppercase text-[10px] tracking-widest hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-gray-100 active:scale-95">Add to Cart</button>
        </div>
    `).join('');
}

function toggleCart() {
    const panel = document.getElementById('cart-panel');
    const overlay = document.getElementById('cart-overlay');
    const isClosing = !panel.classList.contains('translate-x-full');
    panel.classList.toggle('translate-x-full');
    overlay.classList.toggle('opacity-0');
    overlay.classList.toggle('pointer-events-none');
    overlay.classList.toggle('pointer-events-auto'); 
    document.body.style.overflow = isClosing ? 'auto' : 'hidden';
}

function addToCart(id) {
    const p = products.find(x => x.id === id);
    const exists = cart.find(x => x.id === id);
    if (exists) exists.quantity++; else cart.push({...p, quantity: 1});
    saveAndSync();
    
    const toast = document.createElement('div');
    toast.className = "fixed bottom-10 right-10 z-[200] bg-gray-900 text-white px-8 py-5 rounded-3xl shadow-2xl font-black text-[10px] tracking-widest uppercase animate-view";
    toast.innerHTML = `<span class="text-emerald-500">Synced:</span> ${p.name}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

function saveAndSync() {
    localStorage.setItem('apex_cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    document.getElementById('cart-count').innerText = cart.reduce((a,b) => a+b.quantity, 0);
    
    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center py-20 opacity-20"><i data-lucide="shopping-cart" class="w-20 h-20 mx-auto mb-4"></i><p class="font-black text-xs uppercase tracking-widest">Inventory Empty</p></div>`;
        document.getElementById('cart-total').innerText = "RM 0.00";
        return;
    }
    
    let total = 0;
    container.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
        <div class="flex items-center gap-6 bg-[#fcfcfc] p-6 rounded-[2rem] border border-gray-100">
            <div class="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm overflow-hidden p-2">
                <img src="${item.img}" class="w-full h-full object-contain" alt="" onerror="this.src='[https://via.placeholder.com/100](https://via.placeholder.com/100)'">
            </div>
            <div class="flex-1">
                <h4 class="font-black text-sm uppercase tracking-tight">${item.name}</h4>
                <p class="text-emerald-600 font-black text-xs">RM ${item.price}</p>
                <div class="flex items-center gap-4 mt-3">
                    <button onclick="changeQty(${item.id},-1)" class="p-1 hover:text-red-500"><i data-lucide="minus" class="w-3.5 h-3.5"></i></button>
                    <span class="text-xs font-black">${item.quantity}</span>
                    <button onclick="changeQty(${item.id},1)" class="p-1 hover:text-emerald-500"><i data-lucide="plus" class="w-3.5 h-3.5"></i></button>
                </div>
            </div>
        </div>`;
    }).join('');
    document.getElementById('cart-total').innerText = `RM ${total.toFixed(2)}`;
    lucide.createIcons();
}

function changeQty(id, delta) {
    const item = cart.find(x => x.id === id);
    item.quantity += delta;
    if (item.quantity <= 0) cart = cart.filter(x => x.id !== id);
    saveAndSync();
}

function openModal(type, data) {
    const container = document.getElementById('modal-container');
    const content = document.getElementById('modal-content');
    container.classList.replace('hidden', 'flex');
    document.body.style.overflow = 'hidden';

    content.className = "relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-view";

    if (type === 'login') {
        content.innerHTML = `
            <div class="p-12 text-center">
                <h2 class="text-4xl font-black uppercase tracking-tighter mb-4">Tactical Login</h2>
                <p class="text-gray-400 text-sm font-bold uppercase tracking-widest mb-10">Access your deployment dashboard</p>
                <div class="space-y-4">
                    <input type="email" placeholder="Email Address" class="w-full p-5 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-emerald-500">
                    <input type="password" placeholder="Password" class="w-full p-5 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-emerald-500">
                    <button onclick="closeModal()" class="w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs mt-6 shadow-xl shadow-gray-200">Authenticate</button>
                </div>
            </div>
        `;
    }
    lucide.createIcons();
}

function openProductDetail(id) {
    const p = products.find(x => x.id === id);
    const container = document.getElementById('modal-container');
    const content = document.getElementById('modal-content');
    container.classList.replace('hidden', 'flex');
    
    content.className = "relative bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-view";
    
    content.innerHTML = `
        <div class="flex flex-col md:flex-row h-full">
            <div class="md:w-1/2 bg-[#f8f8f8] flex items-center justify-center p-10 md:p-20 min-h-[300px] md:min-h-[500px]">
                <img src="${p.img}" alt="" class="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" onerror="this.src='[https://via.placeholder.com/600](https://via.placeholder.com/600)'">
            </div>
            <div class="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <span class="text-emerald-600 font-black text-xs uppercase tracking-widest mb-4 block">${p.category}</span>
                <h2 class="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">${p.name}</h2>
                <p class="text-gray-500 font-medium mb-10 leading-relaxed text-lg">${p.desc}</p>
                <div class="bg-gray-50 p-8 rounded-3xl mb-10 border border-gray-100">
                    <h4 class="text-xs font-black uppercase tracking-widest mb-4 text-gray-400">Technical Specs</h4>
                    <p class="text-sm font-bold leading-loose text-gray-700">${p.specs}</p>
                </div>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-4xl font-black tracking-tighter">RM ${p.price}</span>
                    <div class="flex items-center gap-4">
                        <button onclick="closeModal()" class="p-4 rounded-2xl border border-gray-200 hover:bg-gray-50 transition text-gray-400" title="Close"><i data-lucide="x"></i></button>
                        <button onclick="addToCart(${p.id}); closeModal();" class="bg-gray-900 text-white px-10 py-5 rounded-[1.2rem] font-black uppercase text-xs tracking-widest hover:bg-emerald-600 transition-all shadow-xl active:scale-95 whitespace-nowrap">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function closeModal() {
    document.getElementById('modal-container').classList.replace('flex', 'hidden');
    document.body.style.overflow = 'auto';
}

function goToCheckout() { if (cart.length > 0) { toggleCart(); showView('checkout'); } }

function renderCheckout() {
    const total = cart.reduce((a,b) => a + (b.price * b.quantity), 0);
    document.getElementById('main-content').innerHTML = `
        <div class="max-w-6xl mx-auto px-4 py-40 animate-view">
            <h2 class="text-6xl font-black uppercase mb-16 tracking-tighter">Gear Deployment</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div class="space-y-8">
                    <div class="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                        <h3 class="font-black text-sm uppercase tracking-[0.3em] text-emerald-600 mb-8">01. Delivery Coordinates</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <input type="text" id="fname" placeholder="First Name" class="p-5 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-sm">
                            <input type="text" id="lname" placeholder="Last Name" class="p-5 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-sm">
                        </div>
                        <input type="email" placeholder="Email Address" class="w-full mt-4 p-5 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-sm">
                        <textarea placeholder="Full Shipping Address" rows="3" class="w-full mt-4 p-5 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-sm"></textarea>
                    </div>
                    <div class="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                        <h3 class="font-black text-sm uppercase tracking-[0.3em] text-emerald-600 mb-8">02. Funding Protocol</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button class="flex items-center justify-between border-2 border-emerald-500 p-6 rounded-3xl bg-emerald-50 text-emerald-700 font-black uppercase text-[10px] tracking-widest">
                                Card Vault <i data-lucide="check-circle"></i>
                            </button>
                            <button class="flex items-center justify-between border-2 border-gray-100 p-6 rounded-3xl hover:bg-gray-50 transition text-gray-400 font-black uppercase text-[10px] tracking-widest">
                                Digital Pay <i data-lucide="circle"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-950 text-white p-12 rounded-[4rem] h-fit sticky top-40 shadow-2xl">
                    <h3 class="font-black text-2xl mb-10 uppercase tracking-tight">Mission Summary</h3>
                    <div class="space-y-6 mb-12">
                        ${cart.map(i => `<div class="flex justify-between font-bold text-sm"><span class="text-gray-500">${i.name} ×${i.quantity}</span><span>RM ${i.price * i.quantity}</span></div>`).join('')}
                    </div>
                    <div class="border-t border-gray-800 pt-10">
                        <div class="flex justify-between items-end">
                            <span class="text-xs font-black text-emerald-500 tracking-[0.4em] uppercase">Deployment Total</span>
                            <span class="text-5xl font-black text-white tracking-tighter">RM ${total.toFixed(2)}</span>
                        </div>
                        <button id="pay-btn" onclick="simPayment()" class="w-full bg-emerald-500 text-gray-950 py-6 rounded-[2rem] font-black uppercase text-xs tracking-widest mt-12 transition-all hover:scale-[1.02] shadow-xl shadow-emerald-500/20">Authorize Transaction</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function simPayment() {
    const btn = document.getElementById('pay-btn');
    const fname = document.getElementById('fname').value;
    if(!fname) {
        const toast = document.createElement('div');
        toast.className = "fixed bottom-10 right-10 z-[200] bg-red-900 text-white px-8 py-5 rounded-3xl shadow-2xl font-black text-[10px] tracking-widest uppercase animate-view";
        toast.innerHTML = `<span class="text-red-400">Error:</span> Please enter deployment details first.`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
        return;
    }
    btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin mx-auto"></i>`;
    lucide.createIcons();
    setTimeout(() => {
        cart = [];
        saveAndSync();
        document.getElementById('main-content').innerHTML = `
            <div class="max-w-2xl mx-auto px-4 py-48 text-center animate-view">
                <div class="w-32 h-32 bg-emerald-500 text-gray-950 rounded-[3rem] flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-emerald-500/30">
                    <i data-lucide="check" class="w-16 h-16"></i>
                </div>
                <h2 class="text-6xl font-black uppercase mb-6 tracking-tighter">Gear Synced!</h2>
                <p class="text-gray-500 font-bold mb-12 text-lg uppercase tracking-widest">Deployment ID: #APX-${Math.floor(Math.random()*90000)+10000}</p>
                <div class="bg-gray-100 p-8 rounded-[2.5rem] border border-gray-200 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-12">
                    This is a prototype simulation. No funds were removed and no gear will be shipped.
                </div>
                <button onclick="showView('home')" class="bg-gray-900 text-white px-12 py-6 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-emerald-600 transition">Return Base</button>
            </div>
        `;
        lucide.createIcons();
    }, 2500);
}

window.onload = () => {
    showView('home');
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) nav.classList.add('nav-scrolled');
        else nav.classList.remove('nav-scrolled');
    });
};
