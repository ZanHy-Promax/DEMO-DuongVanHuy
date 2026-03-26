const API_URL = '/api/products';
const grid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const addBtn = document.getElementById('add-btn');
const form = document.getElementById('product-form');
const modal = document.getElementById('product-modal');
const closeBtn = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const toastNode = document.getElementById('toast');
const modalTitle = document.getElementById('modal-title');

let currentProducts = [];

// Khởi chạy ban đầu
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

// Lấy danh sách sản phẩm
async function loadProducts(query = '') {
    try {
        const url = query ? `${API_URL}/search?name=${encodeURIComponent(query)}` : API_URL;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Không thể lấy dữ liệu');
        
        const products = await response.json();
        currentProducts = products;
        renderProducts(products);
    } catch (error) {
        showToast(error.message, 'error');
        grid.innerHTML = `<div class="loading-state"><p style="color:#ef4444">Lỗi kết nối API: ${error.message}</p></div>`;
    }
}

// Hàm format tiền tệ
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Hiển thị sản phẩm lên UI
function renderProducts(products) {
    if (products.length === 0) {
        grid.innerHTML = `<div class="loading-state"><p style="color:#94a3b8">Không tìm thấy sản phẩm nào.</p></div>`;
        return;
    }

    grid.innerHTML = products.map((product, index) => `
        <div class="product-card" style="animation: slideUp ${0.1 * index}s ease forwards">
            <div class="card-header">
                <h3>${product.name}</h3>
            </div>
            <div class="card-price">${formatCurrency(product.price)}</div>
            <p class="card-desc">${product.description || '<span style="color:#475569">Không có mô tả</span>'}</p>
            <div class="card-meta">
                <span class="stock ${product.quantity < 10 ? 'low' : ''}">Kho: ${product.quantity}</span>
                <div class="card-actions">
                    <button class="btn btn-icon btn-edit" onclick="editProduct(${product.id})" title="Sửa">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn btn-icon btn-danger" onclick="deleteProduct(${product.id})" title="Xóa">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Xử lý tìm kiếm
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        loadProducts(e.target.value);
    }, 300);
});

// Xử lý thêm/sửa form
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('product-id').value;
    const saveBtn = document.getElementById('save-btn');
    
    const productData = {
        name: document.getElementById('name').value,
        price: parseFloat(document.getElementById('price').value),
        quantity: parseInt(document.getElementById('quantity').value),
        description: document.getElementById('description').value
    };

    saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...';
    saveBtn.disabled = true;

    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/${id}` : API_URL;

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Lỗi lưu thông tin');
        }

        closeModal();
        loadProducts();
        showToast(`Đã ${id ? 'cập nhật' : 'thêm'} sản phẩm thành công!`);
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        saveBtn.innerHTML = 'Lưu Thông Tin';
        saveBtn.disabled = false;
    }
});

// Xóa sản phẩm
async function deleteProduct(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Xóa thất bại');
        
        loadProducts();
        showToast('Sản phẩm đã bị xóa!', 'success');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Edit function gọi từ DOM
window.editProduct = (id) => {
    const product = currentProducts.find(p => p.id === id);
    if (!product) return;

    modalTitle.textContent = 'Chỉnh Sửa Sản Phẩm';
    document.getElementById('product-id').value = product.id;
    document.getElementById('name').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('quantity').value = product.quantity;
    document.getElementById('description').value = product.description || '';
    
    modal.classList.add('active');
};

// Modal Logic
window.deleteProduct = deleteProduct;

addBtn.onclick = () => {
    form.reset();
    document.getElementById('product-id').value = '';
    modalTitle.textContent = 'Thêm Sản Phẩm Mới';
    modal.classList.add('active');
};

[closeBtn, cancelBtn].forEach(btn => {
    btn.onclick = closeModal;
});

function closeModal() {
    modal.classList.remove('active');
}

// Toast Notification
function showToast(message, type = 'success') {
    toastNode.textContent = message;
    toastNode.className = `toast show ${type === 'error' ? 'error' : ''}`;
    setTimeout(() => {
        toastNode.classList.remove('show');
    }, 3000);
}

// CSS Animation (Inject from JS for layout)
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
`);
