// Three.js Scene Setup
let scene, camera, renderer, particles;
let mouseX = 0;
let mouseY = 0;

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Create particle system
    const particleCount = 1000;
    const particles = new Float32Array(particleCount * 3);
    const particleGeometry = new THREE.BufferGeometry();
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        particles[i] = (Math.random() - 0.5) * 10;
        particles[i + 1] = (Math.random() - 0.5) * 10;
        particles[i + 2] = (Math.random() - 0.5) * 10;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.02,
        transparent: true,
        opacity: 0.6
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 5;

    // Mouse movement effect
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - window.innerWidth / 2) / 100;
        mouseY = (event.clientY - window.innerHeight / 2) / 100;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        particleSystem.rotation.x += 0.0005;
        particleSystem.rotation.y += 0.0005;
        
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        
        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Person name mapping
const personNames = {
    'sam-r': 'Sam R.',
    'sam-d': 'Sam D.',
    'michael': 'Michael'
};

// Load saved checklist data or use default
let checklistData = {
    campsite: [
        { name: "Tent (weather-resistant for spring conditions)", assignedTo: "sam-r" },
        { name: "Sleeping bag (30°F or lower)", assignedTo: "sam-r" },
        { name: "Sleeping pad or air mattress", assignedTo: "sam-r" },
        { name: "Camping stove with fuel", assignedTo: "sam-d" },
        { name: "Cooking utensils", assignedTo: "sam-d" },
        { name: "Mess kit", assignedTo: "sam-d" },
        { name: "Headlamp/flashlight with batteries", assignedTo: "michael" },
        { name: "Camp chairs", assignedTo: "michael" },
        { name: "Camp table", assignedTo: "michael" },
        { name: "Tarp", assignedTo: "sam-r" },
        { name: "Firestarter", assignedTo: "sam-d" },
        { name: "Water filter/purification tablets", assignedTo: "sam-d" },
        { name: "Camping cookware", assignedTo: "sam-d" },
        { name: "Cooler", assignedTo: "michael" }
    ],
    clothing: [
        { name: "Weather-appropriate layers", assignedTo: "sam-r" },
        { name: "Waterproof jacket", assignedTo: "sam-r" },
        { name: "Hiking boots", assignedTo: "sam-r" },
        { name: "Wool socks (multiple pairs)", assignedTo: "sam-r" },
        { name: "Hat", assignedTo: "sam-r" },
        { name: "Gloves", assignedTo: "sam-r" },
        { name: "Gaiters", assignedTo: "sam-r" }
    ],
    toiletries: [
        { name: "Toothbrush/paste", assignedTo: "sam-r" },
        { name: "Biodegradable soap", assignedTo: "sam-r" },
        { name: "Hand sanitizer", assignedTo: "sam-r" },
        { name: "Toilet paper and trowel", assignedTo: "sam-d" },
        { name: "Wet wipes", assignedTo: "sam-d" },
        { name: "Personal hygiene items", assignedTo: "sam-d" }
    ],
    food: [
        { name: "Non-perishable food", assignedTo: "sam-d" },
        { name: "Snacks", assignedTo: "sam-d" },
        { name: "Water containers", assignedTo: "sam-d" },
        { name: "Cooking oil", assignedTo: "sam-d" },
        { name: "Spices and condiments", assignedTo: "sam-d" }
    ],
    navigation: [
        { name: "Map of the area", assignedTo: "michael" },
        { name: "Compass", assignedTo: "michael" },
        { name: "Multitool or knife", assignedTo: "michael" },
        { name: "Duct tape", assignedTo: "michael" },
        { name: "Rope/cord", assignedTo: "michael" }
    ],
    safety: [
        { name: "First aid kit", assignedTo: "michael" },
        { name: "Whistle", assignedTo: "michael" },
        { name: "Emergency blanket", assignedTo: "michael" },
        { name: "Sunscreen", assignedTo: "michael" },
        { name: "Insect repellent", assignedTo: "michael" },
        { name: "Bear spray", assignedTo: "michael" }
    ],
    misc: [
        { name: "Camera", assignedTo: "sam-r" },
        { name: "Notebook and pen", assignedTo: "sam-r" },
        { name: "Binoculars", assignedTo: "sam-r" },
        { name: "Camp games", assignedTo: "sam-d" },
        { name: "Trash bags", assignedTo: "sam-d" }
    ]
};

// Only initialize localStorage if no data exists
if (!localStorage.getItem('checklistData')) {
    localStorage.setItem('checklistData', JSON.stringify(checklistData));
} else {
    // Load existing data
    checklistData = JSON.parse(localStorage.getItem('checklistData'));
}

// Modal functionality
let currentCategory = null;
let editingItemId = null;

// Update the encodeItemId function
function encodeItemId(name) {
    return btoa(encodeURIComponent(name))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

// Update the decodeItemId function
function decodeItemId(encodedId) {
    try {
        return decodeURIComponent(
            atob(encodedId.replace(/-/g, '+').replace(/_/g, '/'))
        );
    } catch (e) {
        console.error('Error decoding item ID:', e);
        return null;
    }
}

// Add drag and drop functionality
let draggedItem = null;
let draggedItemElement = null;
let placeholder = null;

function createDragPlaceholder() {
    const placeholder = document.createElement('div');
    placeholder.className = 'checklist-item placeholder';
    placeholder.style.height = '0';
    placeholder.style.padding = '0';
    placeholder.style.border = '2px dashed var(--accent-color)';
    return placeholder;
}

function initDragAndDrop() {
    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('checklist-item')) {
            draggedItem = e.target;
            draggedItemElement = e.target;
            e.target.style.opacity = '0.4';
            
            // Create placeholder
            placeholder = createDragPlaceholder();
            draggedItem.parentNode.insertBefore(placeholder, draggedItem);
        }
    });

    document.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('checklist-item')) {
            e.target.style.opacity = '1';
            if (placeholder) {
                placeholder.remove();
            }
            draggedItem = null;
            draggedItemElement = null;
            placeholder = null;
            
            // Save new order to localStorage
            saveItemOrder();
        }
    });

    document.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!draggedItem) return;
        
        const afterElement = getDragAfterElement(e.clientY);
        if (afterElement) {
            draggedItem.parentNode.insertBefore(draggedItem, afterElement);
            draggedItem.parentNode.insertBefore(placeholder, afterElement);
        }
    });
}

function getDragAfterElement(y) {
    const draggableElements = [...document.querySelectorAll('.checklist-item:not(.placeholder)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function saveItemOrder() {
    const categories = {};
    document.querySelectorAll('.category').forEach(category => {
        const categoryName = category.dataset.category;
        categories[categoryName] = [];
        
        category.querySelectorAll('.checklist-item').forEach(item => {
            const itemId = item.querySelector('input').id;
            const [_, encodedName] = itemId.split('-');
            const originalItem = checklistData[categoryName].find(i => 
                encodeItemId(i.name) === encodedName
            );
            if (originalItem) {
                categories[categoryName].push(originalItem);
            }
        });
    });
    
    checklistData = categories;
    localStorage.setItem('checklistData', JSON.stringify(checklistData));
}

// Update the showModal function
function showModal(category = null, itemId = null) {
    const modal = document.getElementById('itemModal');
    const form = document.getElementById('itemForm');
    const title = modal.querySelector('h3');
    
    currentCategory = category;
    editingItemId = itemId;
    
    // Reset form
    form.reset();
    
    // Add submit event listener
    form.onsubmit = handleFormSubmit;
    
    // Add cancel button listener
    document.querySelector('.cancel-btn').onclick = hideModal;
    
    if (itemId) {
        title.textContent = 'Edit Item';
        
        try {
            // Parse the itemId (format: category-encodedName)
            const [itemCategory, encodedName] = itemId.split('-', 2);
            
            // Find the item in the data
            const item = checklistData[itemCategory].find(i => 
                encodeItemId(i.name) === encodedName
            );
            
            if (item) {
                // Populate form with item data
                document.getElementById('itemName').value = item.name;
                document.getElementById('itemCategory').value = itemCategory;
                document.getElementById('itemPerson').value = item.assignedTo;
            } else {
                console.error('Item not found:', itemId);
                alert('Error: Item not found');
                hideModal();
                return;
            }
        } catch (e) {
            console.error('Error processing item ID:', e);
            alert('Error processing item');
            hideModal();
            return;
        }
    } else {
        title.textContent = 'Add New Item';
        if (category) {
            document.getElementById('itemCategory').value = category;
        }
    }
    
    modal.style.display = 'flex';
}

function hideModal() {
    const modal = document.getElementById('itemModal');
    modal.style.display = 'none';
    currentCategory = null;
    editingItemId = null;
}

// Update the handleFormSubmit function
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('itemName').value;
    const category = document.getElementById('itemCategory').value;
    const assignedTo = document.getElementById('itemPerson').value;
    
    if (editingItemId) {
        // Update existing item
        const [oldCategory, encodedName] = editingItemId.split('-', 2);
        
        // Check for duplicates in the target category
        if (hasDuplicateName(name, category, editingItemId)) {
            alert('An item with this name already exists in this category.');
            return;
        }
        
        const oldItemIndex = checklistData[oldCategory].findIndex(i => 
            encodeItemId(i.name) === encodedName
        );
        
        if (oldItemIndex !== -1) {
            // If the category changed, remove from old category and add to new
            if (oldCategory !== category) {
                checklistData[oldCategory].splice(oldItemIndex, 1);
                checklistData[category].push({ name, assignedTo });
            } else {
                // Just update the existing item
                checklistData[category][oldItemIndex] = { name, assignedTo };
            }
        }
    } else {
        // Check for duplicates when adding new item
        if (hasDuplicateName(name, category)) {
            alert('An item with this name already exists in this category.');
            return;
        }
        // Add new item
        checklistData[category].push({ name, assignedTo });
    }
    
    // Save to localStorage
    localStorage.setItem('checklistData', JSON.stringify(checklistData));
    
    // Refresh the checklist
    const categoryDivs = document.querySelectorAll('.category .items');
    categoryDivs.forEach(div => div.innerHTML = '');
    initChecklist();
    
    hideModal();
}

// Update the showDeleteConfirmation function
function showDeleteConfirmation(itemId) {
    const [category, encodedName] = itemId.split('-', 2);
    
    // Find the item
    const item = checklistData[category].find(i => 
        encodeItemId(i.name) === encodedName
    );
    
    if (!item) {
        console.error('Item not found for deletion:', itemId);
        alert('Error: Item not found');
        return;
    }
    
    // Use a consistent confirmation dialog
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
        deleteItem(itemId);
    }
}

// Update the deleteItem function
function deleteItem(itemId) {
    const [category, encodedName] = itemId.split('-', 2);
    
    const itemIndex = checklistData[category].findIndex(i => 
        encodeItemId(i.name) === encodedName
    );
    
    if (itemIndex !== -1) {
        checklistData[category].splice(itemIndex, 1);
        
        // Save to localStorage
        localStorage.setItem('checklistData', JSON.stringify(checklistData));
        
        // Refresh the checklist
        const categoryDivs = document.querySelectorAll('.category .items');
        categoryDivs.forEach(div => div.innerHTML = '');
        
        // Refresh UI and update stats
        refreshCategoryDisplay();
        updateStats();
    }
}

// Update the hasDuplicateName function
function hasDuplicateName(name, category, excludeItemId = null) {
    const encodedNewName = encodeItemId(name);
    return checklistData[category].some(item => {
        const encodedItemName = encodeItemId(item.name);
        if (excludeItemId) {
            const [_, encodedName] = excludeItemId.split('-');
            return encodedItemName === encodedNewName && encodedItemName !== encodedName;
        }
        return encodedItemName === encodedNewName;
    });
}

// Update the initChecklist function to properly set up event listeners
function initChecklist() {
    console.log('Initializing checklist');
    // Load saved state
    const savedState = localStorage.getItem('campingChecklist');
    const checklistState = savedState ? JSON.parse(savedState) : {};

    // Create checklist items
    Object.entries(checklistData).forEach(([category, items]) => {
        const categoryElement = document.querySelector(`[data-category="${category}"] .items`);
        categoryElement.innerHTML = ''; // Clear existing items
        
        items.forEach(item => {
            const encodedName = encodeItemId(item.name);
            const itemId = `${category}-${encodedName}`;
            const isChecked = checklistState[itemId] || false;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'checklist-item';
            itemElement.draggable = true;
            itemElement.innerHTML = `
                <input type="checkbox" id="${itemId}" ${isChecked ? 'checked' : ''}>
                <label for="${itemId}">${item.name}</label>
                <span class="person-assigned">${personNames[item.assignedTo]}</span>
                <div class="item-actions">
                    <button type="button" class="edit-item-btn" data-item-id="${itemId}">✎</button>
                    <button type="button" class="delete-item-btn" data-item-id="${itemId}">×</button>
                </div>
            `;
            
            categoryElement.appendChild(itemElement);
            
            // Attach event listeners directly to the buttons
            const editBtn = itemElement.querySelector('.edit-item-btn');
            const deleteBtn = itemElement.querySelector('.delete-item-btn');
            
            editBtn.addEventListener('click', function() {
                showModal(null, this.dataset.itemId);
            });
            
            deleteBtn.addEventListener('click', function() {
                showDeleteConfirmation(this.dataset.itemId);
            });
        });
    });

    // Add event listeners for checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const itemId = e.target.id;
            checklistState[itemId] = e.target.checked;
            localStorage.setItem('campingChecklist', JSON.stringify(checklistState));
        });
    });

    // Add event listeners for person filter buttons
    const personButtons = document.querySelectorAll('.person-btn');
    personButtons.forEach(button => {
        button.addEventListener('click', () => {
            personButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const selectedPerson = button.dataset.person;
            document.querySelectorAll('.checklist-item').forEach(item => {
                const personAssigned = item.querySelector('.person-assigned').textContent;
                if (selectedPerson === 'all' || personAssigned === personNames[selectedPerson]) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Add event listeners for add item buttons
    document.querySelectorAll('.add-item-btn').forEach(button => {
        button.addEventListener('click', () => {
            showModal(button.dataset.category);
        });
    });
}

// Category names mapping
let categoryNames = {
    'campsite': 'Campsite Equipment',
    'clothing': 'Clothing',
    'toiletries': 'Toiletries',
    'food': 'Food and Water',
    'navigation': 'Navigation and Tools',
    'safety': 'Safety and Emergency',
    'misc': 'Miscellaneous'
};

// Initialize stats charts
let completionChart, personChart, categoryChart, completionByCategoryChart;

function initCharts() {
    // Chart.js configuration
    Chart.defaults.color = '#c8c8c8';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
    
    // Completion chart
    const completionCtx = document.getElementById('completionChart').getContext('2d');
    completionChart = new Chart(completionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Remaining'],
            datasets: [{
                data: [0, 0],
                backgroundColor: [
                    'rgba(0, 184, 148, 0.8)',
                    'rgba(255, 118, 117, 0.8)'
                ],
                borderColor: [
                    'rgba(0, 184, 148, 1)',
                    'rgba(255, 118, 117, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Person chart
    const personCtx = document.getElementById('personChart').getContext('2d');
    personChart = new Chart(personCtx, {
        type: 'bar',
        data: {
            labels: Object.values(personNames),
            datasets: [{
                label: 'Items assigned',
                data: [],
                backgroundColor: 'rgba(0, 184, 148, 0.8)',
                borderColor: 'rgba(0, 184, 148, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Category chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    categoryChart = new Chart(categoryCtx, {
        type: 'pie',
        data: {
            labels: Object.values(categoryNames),
            datasets: [{
                data: [],
                backgroundColor: [
                    'rgba(0, 184, 148, 0.8)',
                    'rgba(116, 185, 255, 0.8)',
                    'rgba(162, 155, 254, 0.8)',
                    'rgba(255, 118, 117, 0.8)',
                    'rgba(253, 203, 110, 0.8)',
                    'rgba(85, 239, 196, 0.8)',
                    'rgba(129, 236, 236, 0.8)'
                ],
                borderColor: [
                    'rgba(0, 184, 148, 1)',
                    'rgba(116, 185, 255, 1)',
                    'rgba(162, 155, 254, 1)',
                    'rgba(255, 118, 117, 1)',
                    'rgba(253, 203, 110, 1)',
                    'rgba(85, 239, 196, 1)',
                    'rgba(129, 236, 236, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12
                    }
                }
            }
        }
    });
    
    // Completion by category chart
    const completionByCategoryCtx = document.getElementById('completionByCategoryChart').getContext('2d');
    completionByCategoryChart = new Chart(completionByCategoryCtx, {
        type: 'bar',
        data: {
            labels: Object.values(categoryNames),
            datasets: [
                {
                    label: 'Completed',
                    data: [],
                    backgroundColor: 'rgba(0, 184, 148, 0.8)',
                    borderColor: 'rgba(0, 184, 148, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Total',
                    data: [],
                    backgroundColor: 'rgba(116, 185, 255, 0.8)',
                    borderColor: 'rgba(116, 185, 255, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Update the updateStats function
function updateStats() {
    const savedState = localStorage.getItem('campingChecklist');
    const checklistState = savedState ? JSON.parse(savedState) : {};
    
    // Count items by category and person
    const personStats = {};
    const categoryStats = {};
    const categoryCompletionStats = {};
    let totalItems = 0;
    let completedItems = 0;
    
    // Initialize counts
    Object.keys(personNames).forEach(person => {
        personStats[person] = 0;
    });
    
    Object.keys(categoryNames).forEach(category => {
        categoryStats[category] = 0;
        categoryCompletionStats[category] = { total: 0, completed: 0 };
    });
    
    // Count items
    Object.entries(checklistData).forEach(([category, items]) => {
        if (!items) return; // Skip if category has no items
        
        items.forEach(item => {
            totalItems++;
            personStats[item.assignedTo]++;
            categoryStats[category]++;
            categoryCompletionStats[category].total++;
            
            const itemId = `${category}-${encodeItemId(item.name)}`;
            if (checklistState[itemId]) {
                completedItems++;
                categoryCompletionStats[category].completed++;
            }
        });
    });
    
    // Update charts
    completionChart.data.datasets[0].data = [completedItems, totalItems - completedItems];
    completionChart.update();
    
    personChart.data.datasets[0].data = Object.keys(personNames).map(person => personStats[person]);
    personChart.update();
    
    categoryChart.data.labels = Object.values(categoryNames);
    categoryChart.data.datasets[0].data = Object.keys(categoryNames).map(category => categoryStats[category]);
    categoryChart.update();
    
    // Update completion by category chart
    const categoryLabels = Object.keys(categoryNames).map(category => categoryNames[category]);
    const completedData = Object.keys(categoryNames).map(category => categoryCompletionStats[category].completed);
    const totalData = Object.keys(categoryNames).map(category => categoryCompletionStats[category].total);
    
    completionByCategoryChart.data.labels = categoryLabels;
    completionByCategoryChart.data.datasets[0].data = completedData;
    completionByCategoryChart.data.datasets[1].data = totalData;
    completionByCategoryChart.update();
    
    // Update summary stats
    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('completedItems').textContent = completedItems;
    document.getElementById('remainingItems').textContent = totalItems - completedItems;
    const completionRate = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    document.getElementById('completionRate').textContent = `${completionRate}%`;
}

// Show category modal
function showCategoryModal(categoryId = null) {
    const modal = document.getElementById('categoryModal');
    const form = document.getElementById('categoryForm');
    const title = modal.querySelector('h3');
    
    // Reset form
    form.reset();
    
    // Add event listeners
    form.onsubmit = handleCategoryFormSubmit;
    modal.querySelector('.cancel-btn').onclick = hideCategoryModal;
    modal.querySelector('.close-modal').onclick = hideCategoryModal;
    
    if (categoryId) {
        // Edit existing category
        title.textContent = 'Edit Category';
        
        // Hide the category ID field when editing
        document.getElementById('categoryIdGroup').style.display = 'none';
        document.getElementById('categoryId').value = categoryId;
        document.getElementById('categoryName').value = categoryNames[categoryId];
    } else {
        // Add new category
        title.textContent = 'Add New Category';
        
        // Show the category name field only, hide ID field
        document.getElementById('categoryIdGroup').style.display = 'none';
        document.getElementById('categoryId').value = '';
    }
    
    modal.style.display = 'flex';
}

// Hide category modal
function hideCategoryModal() {
    const modal = document.getElementById('categoryModal');
    modal.style.display = 'none';
}

// Handle category form submission
function handleCategoryFormSubmit(e) {
    e.preventDefault();
    
    const categoryName = document.getElementById('categoryName').value.trim();
    
    if (categoryName === '') {
        alert('Please enter a category name');
        return;
    }
    
    let categoryId = document.getElementById('categoryId').value.trim().toLowerCase();
    
    // If we're adding a new category, generate an ID from the name
    if (!categoryId) {
        categoryId = generateCategoryId(categoryName);
    }
    
    // Check if it's a new category
    const isNewCategory = !categoryNames[categoryId];
    
    // Update category name
    categoryNames[categoryId] = categoryName;
    
    // Create new category in data structure if needed
    if (isNewCategory && !checklistData[categoryId]) {
        checklistData[categoryId] = [];
    }
    
    // Save to localStorage
    localStorage.setItem('categoryNames', JSON.stringify(categoryNames));
    localStorage.setItem('checklistData', JSON.stringify(checklistData));
    
    // Refresh the UI
    refreshCategoryDisplay();
    updateCategorySelects();
    updateStats();
    
    hideCategoryModal();
}

// Generate a category ID from a name
function generateCategoryId(name) {
    // Convert to lowercase, remove special characters, replace spaces with hyphens
    let id = name.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-z0-9\s-]/g, '') // Keep only alphanumeric chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
    
    // Make sure the ID is unique
    const baseId = id;
    let counter = 1;
    
    while (categoryNames[id]) {
        id = `${baseId}-${counter}`;
        counter++;
    }
    
    return id;
}

// Refresh the category display based on categoryNames
function refreshCategoryDisplay() {
    const categoriesContainer = document.querySelector('.categories');
    
    // Clear existing categories
    categoriesContainer.innerHTML = '';
    
    // Create category elements
    Object.entries(categoryNames).forEach(([categoryId, categoryName]) => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category';
        categoryElement.dataset.category = categoryId;
        categoryElement.innerHTML = `
            <h2>
                <span class="category-name">${categoryName}</span>
                <div class="category-actions">
                    <button class="edit-category-btn" data-category="${categoryId}">✎</button>
                    <button class="add-item-btn" data-category="${categoryId}">+ Add Item</button>
                </div>
            </h2>
            <div class="items"></div>
        `;
        
        categoriesContainer.appendChild(categoryElement);
        
        // Add event listeners
        const editBtn = categoryElement.querySelector('.edit-category-btn');
        const addItemBtn = categoryElement.querySelector('.add-item-btn');
        
        editBtn.addEventListener('click', function() {
            showCategoryModal(this.dataset.category);
        });
        
        addItemBtn.addEventListener('click', function() {
            showModal(this.dataset.category);
        });
    });
    
    // Reinitialize the checklist to populate items
    initChecklist();
}

// Update category selects in the item modal
function updateCategorySelects() {
    const categorySelect = document.getElementById('itemCategory');
    
    // Clear existing options
    categorySelect.innerHTML = '';
    
    // Add options for each category
    Object.entries(categoryNames).forEach(([categoryId, categoryName]) => {
        const option = document.createElement('option');
        option.value = categoryId;
        option.textContent = categoryName;
        categorySelect.appendChild(option);
    });
}

// Load saved category names or use defaults
function loadCategoryNames() {
    const savedCategoryNames = localStorage.getItem('categoryNames');
    if (savedCategoryNames) {
        categoryNames = JSON.parse(savedCategoryNames);
    }
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Load saved data
    loadCategoryNames();
    
    // Initialize the UI
    initThree();
    initCharts();
    refreshCategoryDisplay();
    initDragAndDrop();
    updateStats();
    
    // Add event listeners
    document.querySelector('.close-modal').addEventListener('click', hideModal);
    document.querySelector('.add-category-btn').addEventListener('click', () => showCategoryModal());
    document.querySelector('.refresh-stats-btn').addEventListener('click', updateStats);
    
    // Add checkbox change event listener to update stats
    document.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            // Delay slightly to allow the state to be saved
            setTimeout(updateStats, 100);
        }
    });
}); 